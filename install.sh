#!/bin/bash

create-react-app app
cd app
cp -f public/index.html public
cp -Rf src/* src
cp -f package.json .

yarn install
yarn start
