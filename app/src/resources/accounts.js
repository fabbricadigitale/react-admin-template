import React from 'react';
import {
  TextInput,
  Edit,
  SimpleForm,
} from 'react-admin';
import MuiAccountIcon from '@material-ui/icons/AccountBox';
export { MuiAccountIcon as AccountIcon };

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