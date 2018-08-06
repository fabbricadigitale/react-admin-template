/*global location*/
/*eslint no-restricted-globals: 0*/

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MuiDownloadIcon from '@material-ui/icons/GridOn';
import {green500, grey50} from '@material-ui/core/colors';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

// from http://stackoverflow.com/questions/283956/
function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    document
      .body
      .appendChild(link); //Firefox requires the link to be in the body
    link.download = filename;
    link.href = uri;
    link.click();
    document
      .body
      .removeChild(link); //remove the link when done
  } else {
    location.replace(uri);
  }
}

class DownloadButton extends Component {

  state = {
    loading: false,
    fileData: null
  }

  _onGenerate = () => {
    this.setState({loading: true, fileData: null})
    this
      .props
      .genFile(this._donePreparing)
  }

  _donePreparing = (fileData) => {
    this.setState({loading: false, fileData: fileData})
  }

  _onDownload = () => {
    let fileData = this.props.fileData || (this.props.async
      ? this.state.fileData
      : this.props.genFile())
    if (!fileData) { return false }
    let blob = new Blob([fileData.contents], {type: fileData.mime})
    let url = URL.createObjectURL(blob)
    saveAs(url, fileData.filename)
    this.setState({fileData: null})
    this.props.onDownloaded && this
      .props
      .onDownloaded()
  }

  render() {

    const {
      fileData,
      async,
      showFullTitle,
      downloadTitle,
      loadingTitle,
      generateTitle,
      fullWidth,
      disabled,
      classes,
      icon,
    } = this.props;

    const {loading} = this.state;

    if (fileData || !async || this.state.fileData) {
      let title;
      if ('function' === typeof title) {
        title = title(fileData || this.state.fileData)
      }
      title = showFullTitle
        ? `${downloadTitle} ${this.state.fileData.filename}`
        : downloadTitle
      return <Button
        variant="contained" 
        color="primary"
        onClick={this._onDownload}
        fullWidth={fullWidth}
        disabled={disabled}>
            {cloneElement(icon, {
                className: classes.leftIcon,
            })}
          {title}
        </Button>
    }
    if (loading) 
      return <Button
        fullWidth={fullWidth}
        color='primary'
        disabled={true}>        
            {cloneElement(icon, {
                className: classes.leftIcon,
            })}
          {loadingTitle}
        </Button>
    return <Button
      onClick={this._onGenerate}
      disabled={disabled}
      fullWidth={fullWidth}
      color='primary'>
            {cloneElement(icon, {
                className: classes.leftIcon,
            })}
        {generateTitle}
      </Button>
  }

}

DownloadButton.propTypes = {
  fileData: PropTypes.object,
  genFile: PropTypes.func,
  async: PropTypes.bool,
  generateTitle: PropTypes.string,
  downloadTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  showFullTitle: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loadingTitle: PropTypes.string,
  onDownloaded: PropTypes.func,
  disabled: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

DownloadButton.defaultProps = {
  async: false,
  showFullTitle: true,
  fullWidth: true,
  disabled: false,
  downloadTitle: 'Download',
  generateTitle: 'Export',
  loadingTitle: 'Preparing..',
  icon: <MuiDownloadIcon/>,
}

export default withStyles(styles)(DownloadButton);