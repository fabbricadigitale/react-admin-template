import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiDownloadIcon from '@material-ui/icons/GetApp';
import { stringify } from 'query-string';
import { baseApiUrl } from '../App';
import { snakeCase } from 'lodash';
import DownloadButton from './DownloadButton';

class ExportToExcel extends Component {

    render() {

        const {
            record, 
            resource,  
            related, 
            filterValues, 
            path,
        } = this.props;

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

        const filename = related ?
            `${record.name}.xlsx`
            : resource ?
            `${resource}.xlsx`
            : `${path.substr(0,path.indexOf('/'))}.xlsx`

        return <DownloadButton
                    icon={<MuiDownloadIcon/>}
                    title="Export"
                    url={url}
                    filename={filename}/>

    }
}

ExportToExcel.propTypes = {
    resource: PropTypes.string,
    style: PropTypes.object,
};


export default ExportToExcel;
