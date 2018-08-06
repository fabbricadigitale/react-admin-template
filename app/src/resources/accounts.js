import React from 'react';
import {
  TextInput,
  Edit,
  SimpleForm,
} from 'react-admin';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

export const AccountIcon = () => <Icon className={classNames('fa-menu-icon', 'fa fa-user-circle')} />

const AccountTitle = ({ record }) => {
  return <span>{record ? `${record.username}` : ''}</span>;
};

const validator = (values) => {
  const errors = {};

  if (values['password'] !== values['password-confirmation']) {
      errors['password-confirmation'] = ['Password confirmation must match Password'];
  }

  return errors;
};

//The redirect to login is needed because the current session token is not valid after the username change
export const AccountEdit = (props) => (
  <Edit
    {...props}
    title={<AccountTitle />}
  >
    <SimpleForm redirect={{ resource: 'login' }} validate={validator}>
      <TextInput source="username" />
      <TextInput source="email" type="email" />
      <TextInput source="password" type="password" />
      <TextInput source="password-confirmation" label="Password confirmation" type="password" />
    </SimpleForm>
  </Edit>
);