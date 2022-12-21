#!/usr/bin/env bash

# Install moduls
yarn --ignore-scripts

# Install playwright dependencies
yarn playwright install-deps

# Build the app
yarn build

# Start up the app
yarn start
