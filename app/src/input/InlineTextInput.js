import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudUpdate as crudUpdateAction } from 'react-admin';
import TextField from '@material-ui/core/TextField';
import { grey300 } from '@material-ui/core/colors';
import { get } from 'lodash';

const styles = {
    editable: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomStyle: 'dotted',
        borderBottomColor: grey300,
        cursor: 'pointer',
    },
};

class InlineTextInput extends Component {

    state = {
        editing: false,
        value: get(this.props.record, this.props.source)
    }

    handleSubmit = () => {
        const { source, data, resource, id, basePath } = this.props;
        const { value } = this.state;
        this.setState({ editing: false });
        this.props.crudUpdate(resource, id, { [source]: value }, data, basePath, false, true);
    }

    handleBlur = (eventOrValue) => {
        eventOrValue.stopPropagation();
        this.setState({ editing: false });
    }

    handleFocus = event => event.stopPropagation();

    handleClick = event => event.stopPropagation();

    handleKeyUp = event => event.stopPropagation();

    handleChange = (event, newValue) => {
        event.stopPropagation();
        this.setState({ value: newValue })
    }

    handleInlineEdit = (event) => {
        event.stopPropagation();
        this.setState({ editing: true });
    };

    handleKeyDown = (event) => {
        event.stopPropagation();
        if (event.key === 'Escape') { this.setState({ editing: false }) }
    }

    handleKeyPress = (event) => {
        event.stopPropagation();
        if (event.key === 'Enter') { this.handleSubmit() }
    }

    render() {

        const { children, id } = this.props;
        const { value, editing } = this.state;

        return (
            <span>
                {editing ?
                    <TextField
                        id={`inline-${id}`}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        onKeyPress={this.handleKeyPress}
                        onKeyUp={this.handleKeyUp}
                        defaultValue={value}
                    /> :
                    <span
                        key={`field-${id}`}
                        onClick={this.handleInlineEdit}
                        style={styles.editable}
                    >
                        {React.cloneElement(children, { ...this.props })}
                    </span>
                }
            </span>
        );
    }
}


InlineTextInput.propTypes = {
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
    return {
        id: props.record.id,
        data: state.admin.resources[props.resource].data[props.record.id],
        isLoading: state.admin.loading > 0,
    };
}

export default connect(
    mapStateToProps,
    { crudUpdate: crudUpdateAction },
)(InlineTextInput);
