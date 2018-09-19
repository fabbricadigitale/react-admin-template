# React-Admin-Template
This template creates a React application using `create-react-app` bundled with 
[react-admin](https://marmelab.com/react-admin/index.html), a frontend framework 
for building admin applications running in the browser on top of REST/GraphQL APIs, 
using ES6, [React](https://facebook.github.io/react/) and [Material Design](https://material.io/)

The following components are provided to allow further customization of `react-admin`:

+ A custom `Logout` component. Adds a `My Account` button to allow the currently logged in user to modify its profile.
+ A custom `theme`
+ A **JSON API data client**. A data client compatible with [JSON API Resources](http://jsonapi-resources.com)
+ A **JWT auth client**. An authentication & authorization client compatible with [JSON Web Tokens](https://jwt.io/) for managing and verifying user tokens
+ A `downloadFile` function. Useful to download any file from the browser.
+ A working `DateTimeInput` component.

The template provides an example resource, `countries` which references the `countries` resource defined in
the [`rails-api-template`](https://github.com/fabbricadigitale/rails-api-template). Adding this resource exposes 
the following further functionalities:

+ A custom `ActionsWithExcel` component. Visible in the resource list page, allows exporting and importing of records to/from Excel files
with the `ExportToExcel` and `ImportFromExcel` components.
+ A custom `PrintToPdf` component. Request and download a PDF file from the API.
+ A custom `FlagField` component. Show an SVG flag based on ISO country code.

# Requirements

+ **Yarn**
+ **create-react-app**

# Usage

In the directory you want the app to be created:

```
wget -O - https://raw.githubusercontent.com/matteolc/react-admin-template/master/template | bash
```

```
cd app
yarn start
```
