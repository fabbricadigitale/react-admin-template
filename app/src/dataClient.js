import { stringify } from 'query-string';
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
    SORT_ASC,    
} from 'react-admin';
import { snakeCase, toLower } from 'lodash';

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
            case GET_MANY_REFERENCE:
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const getListQuery = {
                    'page[offset]': (page - 1) * perPage,
                    'page[limit]': perPage,
                    'sort': (order === SORT_ASC ? field : `-${field}`),
                };
                Object.keys(params.filter).forEach(key => {
                    getListQuery[`filter[${snakeCase(key)}]`] = params.filter[key];
                })
                if (type === GET_MANY_REFERENCE) {
                    getListQuery[`filter[${snakeCase(params.target)}]`] = params.id;
                }                
                url = `${apiUrl}/${resource}?${stringify(getListQuery)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                const getManyQuery = { 'filter[ids]': params.ids.toString() };
                url = `${apiUrl}/${resource}?${stringify(getManyQuery)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PATCH';
                var attrs = {};
                Object.keys(params.data).forEach(key => attrs[key] = params.data[key]);
                delete attrs['id'];
                const updateParams = { data: { type: resource, id: params.id, attributes: attrs } };
                options.body = JSON.stringify(updateParams);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                const createParams = { data: { type: resource, attributes: params.data } };
                options.body = JSON.stringify(createParams);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:   
            var jsonData = json.data.map(dic => {
                return Object.assign({ id: dic.id }, dic.attributes, dic.meta);
            });                    
                if (!json.meta['record-count']) {
                    throw new Error(
                        'The Record-Count or Record-Total is missing in the meta of the HTTP Response. The JSONAPI REST client expects responses for lists of resources to contain this meta with the total number of results to build the pagination.'
                    );
                }                
                return {
                    data: jsonData,
                    total: json.meta['record-count'],
                };
            case GET_MANY:
                jsonData = json.data.map(obj => {
                    return Object.assign({ id: obj.id }, obj.attributes);
                })
                return { data: jsonData }
            case UPDATE:                
            case CREATE:
                return { data: Object.assign({ id: json.data.id }, json.data.attributes) };
            case DELETE:
                return { data: {} }
            case GET_ONE:
                var included = {}
                return { data: Object.assign({ id: json.data.id }, json.data.attributes, included) }                
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }

        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};
