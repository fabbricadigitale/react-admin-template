/*global location*/
/*eslint no-restricted-globals: 0*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from '@material-ui/RaisedButton';
import DownloadIcon from '@material-ui/icons/file-download';
import {green500, grey50} from 'material-ui/styles/colors';

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
      return <RaisedButton
        onClick={this._onDownload}
        label={title}
        icon={icon}
        fullWidth={fullWidth}
        disabled={disabled}
        backgroundColor={green500}
        labelColor={grey50}/>
    }
    if (loading) 
      return <RaisedButton
        icon={icon}
        label={loadingTitle}
        fullWidth={fullWidth}
        primary={true}
        disabled={true}/>
    return <RaisedButton
      icon={icon}
      onClick={this._onGenerate}
      label={generateTitle}
      disabled={disabled}
      fullWidth={fullWidth}
      primary={true}/>
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
  disabled: PropTypes.bool
}

DownloadButton.defaultProps = {
  async: false,
  showFullTitle: true,
  fullWidth: true,
  disabled: false,
  downloadTitle: 'Download',
  generateTitle: 'Generate file',
  loadingTitle: 'Loading...',
  icon: <DownloadIcon/>,
}

export default DownloadButton;