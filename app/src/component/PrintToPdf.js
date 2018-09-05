import React from 'react';
import PropTypes from 'prop-types';
import { baseApiUrl } from '../App';
import MuiPrintIcon from '@material-ui/icons/Print';
import DownloadButton from './DownloadButton';

const PrintToPdf = ({
    record,
    resource,
    ...rest
}) => (
    <DownloadButton
        title="Print"
        icon={<MuiPrintIcon/>}
        url={`${baseApiUrl}/print/${record.id}?resource=${resource}`}
        filename={`${record.name}.pdf`}/>
);
	
PrintToPdf.propTypes = {
    record: PropTypes.object,
    resource: PropTypes.string,
};

export default PrintToPdf;

