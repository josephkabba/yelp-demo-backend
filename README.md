# Yelp Demo Test Backend App

This is a demo test backend app for Yelp, designed to provide basic functionality for restaurants. The backend is built using NestJS.

The following API endpoints are available in this app:

- `GET /api/restaurants` - Get operation to get a list of restaurants based on two query params ("term" and "location")
- `GET /api/restaurants/:id` - Get operation to get a single restaurant

## Installation

```bash
$ yarn install
```

## Running the app

You will need to add a .env file to the project and add your yelp api key. Please follow the schema from the .env.example.

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
