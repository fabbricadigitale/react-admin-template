import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { translate } from 'react-admin';

const defaultStyle = {
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999',
    },
    previewContainer: {
        position: 'relative',
        display: 'inline-block',
    },
};

class FileInput extends Component {

    state = {
        file: null,
    }

    onDrop = (files) => {
        const uploadedFile = files[0];
        this.setState({ file: uploadedFile });
        this.props.onChange(uploadedFile);
    }

    label() {
        return (
            <p>Drop a file to upload, or click to select it.</p>
        );
    }

    render() {
        const {
            accept,
            disableClick,
            elStyle,
            maxSize,
            minSize,
            multiple,
            style,
        } = this.props;

        const finalStyle = {
            ...defaultStyle,
            ...style,
        };

        const { file } = this.state;

        return (
            <div style={elStyle}>
                <Dropzone
                    onDrop={this.onDrop}
                    accept={accept}
                    disableClick={disableClick}
                    maxSize={maxSize}
                    minSize={minSize}
                    multiple={multiple}
                    style={finalStyle.dropZone}
                >
                    {this.label()}
                    {file &&
                        <a href={file.preview}>{file.name}</a>
                    }
                </Dropzone>

            </div>
        );
    }
};

FileInput.propTypes = {
    accept: PropTypes.string,
    disableClick: PropTypes.bool,
    elStyle: PropTypes.object,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    multiple: PropTypes.bool,
    style: PropTypes.object,
};

FileInput.defaultProps = {
    addLabel: true,
    addField: true,
    multiple: false,
    onUpload: () => { },
};

export default translate(FileInput);

