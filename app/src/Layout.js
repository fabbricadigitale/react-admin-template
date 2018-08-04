import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    withStyles, 
    MuiThemeProvider, 
    createMuiTheme 
} from '@material-ui/core/styles';
import {
    AppBar,
    Sidebar,
    Notification,
    setSidebarVisibility,
} from 'react-admin';
import Menu from './Menu';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    appBar: {

    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
        paddingLeft: theme.spacing.unit * 2,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: theme.spacing.unit * 3,
        marginTop: '4em',
        paddingLeft: 5,
    },
});

class Layout extends Component {
    componentWillMount() {
        this.props.setSidebarVisibility(false);
    }

    render() {
        const {
            children,
            classes,
            dashboard,
            isLoading,
            logout,
            open,
            title,
        } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar title={title} open={open} logout={logout} color='primary'/>
                    <main className={classes.contentWithSidebar}>
                        <Sidebar>
                            <Menu logout={logout} hasDashboard={!!dashboard} />
                        </Sidebar>                    
                        <div className={classes.content}>
                            {children}
                        </div>
                    </main>
                    <Notification />
                </div>
            </div>            
        );
    }
}

Layout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    dashboard: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    isLoading: PropTypes.bool.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });
export default connect(mapStateToProps, { setSidebarVisibility })(withStyles(styles)(Layout));