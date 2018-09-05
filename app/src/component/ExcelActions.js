import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import MuiExcelIcon from '@material-ui/icons/GridOn';
import ExportToExcel from './ExportToExcel';
import ImportFromExcel from './ImportFromExcel';

const styles = theme => ({
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
  });

class ExcelActions extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    const { 
        resource,
        filterValues,
        hasUpload,
        classes,
        uniqueKey,
     } = this.props;

    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          color="primary"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MuiExcelIcon className={classes.leftIcon}/>
          Excel
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem>
            <ExportToExcel 
              onClose={this.handleClose} 
              resource={resource} 
              filterValues={filterValues}/>
          </MenuItem>
          {hasUpload && <MenuItem>
            <ImportFromExcel 
              resource={resource} 
              uniqueKey={uniqueKey}/>
          </MenuItem>}
        </Menu>
      </div>
    );
  }
}

ExcelActions.defaultProps = {
    hasUpload: false,
};

export default withStyles(styles)(ExcelActions);