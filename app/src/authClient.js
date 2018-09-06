import {
    AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS
} from 'react-admin';
import { baseApiUrl } from './App';
import { get } from 'lodash';

var jwtDecode = require('jwt-decode');

export const SESSION_TOKEN = 'token';
export const SESSION_ACCOUNT_ID = 'sub';
export const SESSION_ROLES = 'roles';

export const requestSessionHeaders = {
    'Authorization': `Bearer ${localStorage.getItem(SESSION_TOKEN)}`, 	  
  };

export function setRequestSessionHeaders(headers) {
    headers.set('Authorization', `Bearer ${localStorage.getItem(SESSION_TOKEN)}`);
}

export default (type, params) => {
    if (type === AUTH_ERROR) {
        const {status} = params;
        if (status === 401 || status === 403) {
            return Promise.reject({redirectTo: '/login'});
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem(SESSION_TOKEN)
            ? Promise.resolve()
            : Promise.reject({redirectTo: '/login'});
    }
    if (type === AUTH_LOGOUT) {
        const request = new Request(`${baseApiUrl}/logout`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/vnd.api+json'})
        })
        setRequestSessionHeaders(request.headers);
        return fetch(request).then(response => {
            localStorage.removeItem(SESSION_TOKEN);
            localStorage.removeItem(SESSION_ACCOUNT_ID);
            localStorage.removeItem(SESSION_ROLES);
            return Promise.resolve();
        });
    }
    if (type === AUTH_LOGIN) {
        const {username, password} = params;
        const request = new Request(`${baseApiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/vnd.api+json'})
        })
        return fetch(request).then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.json()
        }).then(json => {
            const token = get(json, SESSION_TOKEN);
            const jwt = jwtDecode(token);
            localStorage.setItem(SESSION_TOKEN, token)
            localStorage.setItem(SESSION_ACCOUNT_ID, get(jwt, SESSION_ACCOUNT_ID))
            localStorage.setItem(SESSION_ROLES, JSON.stringify(get(jwt, SESSION_ROLES)))
            return Promise.resolve();
        });
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = JSON.parse(localStorage.getItem(SESSION_ROLES));
        if (role) {
            return Promise.resolve(role[0])
        } else {
            return Promise.resolve(null);
        }
    }
    return Promise.reject('Unkown method');
}