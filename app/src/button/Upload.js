import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import LinearProgress from 'material-ui/LinearProgress';
import {baseApiUrl} from '../App';
import {SESSION_TOKEN} from '../authClient';

var request = require('superagent');

const styles = {
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999',
        margin: '1em 0'
    }
};

class Upload extends Component {

    state = {
        open: false,
        file: null,
        loading: false,
        error: null,
        partial: true
    };

    onDrop = (files) => {
        const uploadedFile = files[0];
        this.setState({file: uploadedFile});
    }

    handleSubmit = () => {
        const {resource} = this.props;
        const {file, partial} = this.state;
        const requestSessionHeaders = { 'Authorization': `Bearer ${localStorage.getItem(SESSION_TOKEN)}` };
        this.setState({loading: true})
        const url = `${baseApiUrl}/upload?resource=${resource}&partial=${partial}`
        request
            .post(url)
            .attach('file', file)
            .set(requestSessionHeaders)
            .end(this.allDone);
    };

    allDone = (err, res) => {
        if (res.status === 422) {
            this.setState({loading: false, error: res.body.errors[0].detail})
        } else if (res.status === 200) {
            this.setState({loading: false, open: false})
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleErrorClose = () => {
        this.setState({error: null});
    };

    render() {
        const {label, style, allowFullUpload} = this.props;
        const {file, loading, error, partial, open} = this.state;
        const elStyle = {
            ...style,
            display: 'inline-block'
        }
        const actions = [ < FlatButton label = "Cancel" primary = {
                true
            }
            onClick = {
                this.handleClose
            } />, < FlatButton label = "Submit" primary = {
                true
            }
            disabled = {
                file
                    ? false
                    : true
            }
            onClick = {
                this.handleSubmit
            } />
        ];

        const errorActions = [< FlatButton label = "Got it" primary = {
                true
            }
            onClick = {
                this.handleErrorClose
            } />];

        return <div style={elStyle}>
            <RaisedButton onClick={this.handleOpen} label={label}/>
            <Dialog title="Import Data" actions={actions} modal={true} open={open}>
                {loading
                    ? <LinearProgress mode="indeterminate"/>
                    : <div>
                        Here you can import new data or update existing data.
                        <Dropzone onDrop={this.onDrop} multiple={false} style={styles.dropZone}>
                            {file
                                ? <a href={file.preview}>{file.name}</a>
                                : "Drop a file to upload, or click to select it."
                            }
                        </Dropzone>
                        {allowFullUpload && <Checkbox
                            label={'Is this a partial update?'}
                            defaultChecked={partial}
                            onCheck={(event, isInputChecked) => {
                            this.setState({partial: isInputChecked})
                        }}/>}

                    </div>
                }
            </Dialog>
            <Dialog
                title="An error has occurred"
                actions={errorActions}
                modal={true}
                open={error}>
                {error}
            </Dialog>

        </div>
    }

}

Upload.propTypes = {
    resource: PropTypes.string,
    label: PropTypes.string,
    allowFullUpload: PropTypes.bool,
};

Upload.defaultProps = {
    label: "Import",
    allowFullUpload: true,
};

export default Upload;