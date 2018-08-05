import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import dataClient from './dataClient';
import authClient, { setRequestSessionHeaders } from './authClient';
import Layout from './Layout';
import { ROLE_ADMIN } from './types';
import {
  AccountEdit,
  UserList,
  UserShow,
  UserCreate,
  UserEdit,
  UserIcon,
  CountryIcon,
  CountryList,
  CountryEdit,
  CountryShow,
} from './resources';

const GetBrowserLanguage = () => {
  if (navigator.languages !== undefined) {
      return navigator.languages[0];
  }
  return navigator.language;
}

export const BrowserLocale = GetBrowserLanguage();

export const baseApiUrl = process.env.REACT_APP_API_PROTOCOL && process.env.REACT_APP_API_ADDRESS && process.env.REACT_APP_API_PORT
  ? `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}/api/v1`
  : `/api/v1`;

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/vnd.api+json' });
    options.headers.set('Content-Type', 'application/vnd.api+json')
  }
  setRequestSessionHeaders(options.headers);
  return fetchUtils.fetchJson(url, options);
}

export const apiClient = dataClient(baseApiUrl, httpClient);  

const App = () =>
      <Admin 
        title="Dashboard"
        appLayout={Layout} 
        authProvider={authClient}
        dataProvider={apiClient}>
    {permissions => [
      <Resource
        name="countries"
        icon={CountryIcon}
        list={CountryList}
        edit={permissions === ROLE_ADMIN && CountryEdit}
        show={CountryShow} />,      
      permissions === ROLE_ADMIN && <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      icon={UserIcon}
      create={UserCreate} />,
    <Resource
      name="accounts"
      edit={AccountEdit} />,      
    ]}        
      </Admin>

export default App;