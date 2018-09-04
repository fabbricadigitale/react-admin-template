import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiPrintIcon from '@material-ui/icons/Print';
import { showNotification as showNotificationAction } from 'react-admin';
import DownloadButton from '../button/DownloadButton';
import { baseApiUrl } from '../App';
import { SESSION_TOKEN } from '../authClient';
import axiosClient from "axios";

class PrintToPdf extends Component {
    
  download = (done) => {       
  	            
  	const { record, resource, showNotification } = this.props;
  	const url = `${baseApiUrl}/print/${record.id}?resource=${resource}`
    const requestSessionHeaders = { 'Authorization': `Bearer ${localStorage.getItem(SESSION_TOKEN)}` };

    const axiosCfg = {
        url: url,
        method: 'get',
        headers: {
            ...requestSessionHeaders
        },
        responseType: 'arraybuffer'
    }

    const client = axiosClient.create({});

    client(axiosCfg).then(response => {
        done({
            filename: `${record.name}.pdf`, 
            contents: response.data
        });
    })
    .catch(error => {
        console.error(error)
        showNotification('Error: could not download file', 'warning')
        done(null)
    })    
  	  
  }    

    render() {
        return <DownloadButton 
            icon={<MuiPrintIcon/>}
            generateTitle="Print" 
            loadingTitle="Processing.." 
            showFullTitle={false}
            fullWidth= {false}
            async={true} 
            genFile={this.download}/>;
    }
}	
	
PrintToPdf.propTypes = {
    record: PropTypes.object,
    resource: PropTypes.string,
};

export default connect(null, {
    showNotification: showNotificationAction,
})(PrintToPdf);

