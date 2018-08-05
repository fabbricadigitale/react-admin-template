import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudUpdate as crudUpdateAction } from 'react-admin';
import Toggle from '@material-ui/Toggle';
import { get } from 'lodash';

const styles = {
    icon: {
        width: 36,
        margin: 'auto',
        padding: '4px 0px 6px 2px',
    },
}

class ToggleInput extends Component {

    handleToggle = (event, isInputChecked) => {
        const { source, data, resource, id, basePath } = this.props;
        const record = { [source]: isInputChecked };
        this.props.crudUpdate(resource, id, record, data, basePath, false, true);
    }

    render() {

        const { source, record, id, elStyle } = this.props;
        const iconStyle = styles.icon;
        const checked = get(record, source);

        return (
            <div style={elStyle} key={`${id}-${source}`}>
                <Toggle
                    iconStyle={iconStyle}
                    defaultToggled={checked}
                    onToggle={(event, isInputChecked) => {
                        event.stopPropagation();
                        this.handleToggle(event, isInputChecked)
                    }} />
            </div>
        );
    }
}

ToggleInput.propTypes = {
    elStyle: PropTypes.object,
    addLabel: PropTypes.bool,
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};


ToggleInput.defaultProps = {
    addLabel: true,
};

function mapStateToProps(state, props) {
    return {
        id: props.record.id,
        data: state.admin.resources[props.resource].data[props.record.id],
        isLoading: state.admin.loading > 0
    };
}

export default connect(mapStateToProps, {
    crudUpdate: crudUpdateAction,
}, )(ToggleInput);
