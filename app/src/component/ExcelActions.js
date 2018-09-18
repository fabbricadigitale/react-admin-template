import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MuiExcelIcon from '@material-ui/icons/GridOn';
import { Button } from 'ra-ui-materialui';
import ExportToExcel from './ExportToExcel';
import ImportFromExcel from './ImportFromExcel';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  });

class ExcelActions extends Component {

    state = {
        open: false,
        value: 0,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };   

    render() {
        const { 
            classes,
            resource,
            filterValues,
            hasUpload,
            uniqueKey,
        } = this.props;

        const { 
            open,
            value,
        } = this.state;

        return <div className={classes.root}>
            <Button 
                onClick={ this.handleOpen }
                label="Excel">
                <MuiExcelIcon/>
            </Button>
            <Dialog 
                aria-labelledby="upload-dialog-title"
                open={open}>
                <AppBar position="static">
                    <Tabs 
                        centered
                        value={value} 
                        onChange={this.handleChange}>
                        <Tab label="Export" />
                        <Tab label="Import" disabled={!hasUpload}/>
                    </Tabs> 
                </AppBar>
                {value === 0 && <TabContainer>
                    <ExportToExcel 
                        onClose={this.handleClose} 
                        resource={resource} 
                        filterValues={filterValues}/>
                </TabContainer>}
                {value === 1 && <TabContainer>
                    <ImportFromExcel 
                        onClose={this.handleClose}
                        resource={resource} 
                        uniqueKey={uniqueKey}/>                        
                </TabContainer>}                          
            </Dialog>    
        </div>
    }

}

ExcelActions.propTypes = {
    resource: PropTypes.string,
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ExcelActions);