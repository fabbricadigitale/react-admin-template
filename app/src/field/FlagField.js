import React from 'react';
import PropTypes from 'prop-types';
import {get} from 'lodash';

import Flag from 'react-flags';  

const FlagField = ({ source, record = {}, elStyle }) => <span style={elStyle}>
    <Flag 
        name={get(record, source)} 
        format="png" 
        pngSize={24} 
        shiny={true} 
        basePath="/flags" 
    />
</span>;

FlagField.propTypes = {
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default FlagField;
