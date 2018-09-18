import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExportToExcelButton from './ExportToExcelButton';

class ExportToExcel extends Component {

    render() {
        const { 
            onClose,
            resource,
            filterValues,
        } = this.props;

        return <span>
                <DialogTitle id="upload-dialog-title">Export Data</DialogTitle>
                <DialogContent>
                            <DialogContentText>
                                Here you can export existing data.
                            </DialogContentText>           
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary"
                        onClick= { onClose }>
                        Cancel
                    </Button>
                    <ExportToExcelButton
                        onClose={onClose}
                        resource={resource} 
                        filterValues={filterValues}                    
                        />                              
                </DialogActions>
            </span>
    }

}

ExportToExcel.propTypes = {
    resource: PropTypes.string,
    label: PropTypes.string,
    allowFullUpload: PropTypes.bool,
};

ExportToExcel.defaultProps = {
    label: "Import",
    allowFullUpload: true,
    accept: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};

export default ExportToExcel;