import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import compose from 'recompose/compose';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Logout as LogoutIcon } from 'grommet-icons';
import { AccountIcon } from './resources';
import classnames from 'classnames';
import { translate, userLogout as userLogoutAction } from 'ra-core';
import { SESSION_ACCOUNT_ID } from './authClient';

const styles = theme => ({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    iconMenuPaddingStyle: {
        paddingRight: '1.2em',
    },
    iconPaddingStyle: {
        paddingRight: theme.spacing.unit,
    },
});

const sanitizeRestProps = ({
    classes,
    className,
    translate,
    userLogout,
    locale,
    redirectTo,
    ...rest
}) => rest;
/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
const Logout = ({ classes, className, translate, userLogout, ...rest }) => (
    <span>        
        <MenuItem
            className={classnames('account', classes.menuItem, className)}
            component={NavLink}
            to={`/accounts/${localStorage.getItem(SESSION_ACCOUNT_ID)}`}
            {...sanitizeRestProps(rest)}
        >
            <span className={classes.iconMenuPaddingStyle}>
                <AccountIcon />
            </span>
            Account
        </MenuItem>    
        <MenuItem
            className={classnames('logout', classes.menuItem, className)}
            onClick={userLogout}
            {...sanitizeRestProps(rest)}
        >
            <span className={classes.iconMenuPaddingStyle}>
                <LogoutIcon />
            </span>
            {translate('ra.auth.logout')}
        </MenuItem>
    </span>
);

Logout.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    translate: PropTypes.func,
    userLogout: PropTypes.func,
    redirectTo: PropTypes.string,
};

const mapStateToProps = state => ({
    theme: state.theme,
});

const mapDispatchToProps = (dispatch, { redirectTo }) => ({
    userLogout: () => dispatch(userLogoutAction(redirectTo)),
});

const enhance = compose(
    translate,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
);

export default enhance(Logout);
