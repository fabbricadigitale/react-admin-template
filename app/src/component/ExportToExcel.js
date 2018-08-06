import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DownloadButton from '../button/DownloadButton';
import { showNotification as showNotificationAction } from 'react-admin';
import { stringify } from 'query-string';
import { baseApiUrl } from '../App';
import { SESSION_TOKEN } from '../authClient';
import { snakeCase } from 'lodash';
import axiosClient from "axios";

class ExportToExcel extends Component {

    download = (done) => {
        const { record, resource, showNotification, related, filterValues, path } = this.props;
        let query = {};
        let url = `${baseApiUrl}/`

        if (path) {
            url = `${url}/${path}`;
        }
        else {
            query = { resource };
            filterValues && Object.keys(filterValues).forEach(key => {
                query[`filter[${snakeCase(key)}]`] = filterValues[key];
            })
            query = related ? {
                ...query,
                related: related,
                id: record.id
            } : query;
            url = `${url}download?${stringify(query)}`;
        }

        const requestSessionHeaders = {
            'Authorization': `Bearer ${localStorage.getItem(SESSION_TOKEN)}`,
        };
        const axiosCfg = {
            url: url,
            method: 'get',
            headers: {
                ...requestSessionHeaders
            },
            responseType: 'arraybuffer'
        }

        const client = axiosClient.create({});

        client(axiosCfg)
            .then(response => {
                const filename = related ?
                    `${record.name}.xlsx`
                    : resource ?
                    `${resource}.xlsx`
                    : `${path.substr(0,path.indexOf('/'))}.xlsx`
                done({
                    filename: filename,
                    contents: response.data
                })
            })
            .catch(error => {
                console.error(error)
                showNotification('Error: could not download file', 'warning')
                done(null)
            })

    }

    render() {
        const { label, style } = this.props;
        const elStyle = {
            ...style,
            display: 'inline-block',
        }
        return <div style={elStyle}>
            <DownloadButton
                generateTitle={label}
                showFullTitle={false}
                async={true}
                genFile={this.download}
            />
        </div>
    }
}

ExportToExcel.propTypes = {
    resource: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object,
};

ExportToExcel.defaultProps = {
    label: "Excel",
};

export default connect(null, {
    showNotification: showNotificationAction,
})(ExportToExcel);
