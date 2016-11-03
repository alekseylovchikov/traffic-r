# ADS Frontend

## Install

- Clone this repository

- Move to the cloned folder and install all dependencies
  ```cd %dir%```
  ```npm install```

## Prepare

You need to set some variables to use app.

For development build you need to create a .env file and fill it with next variables (these values are for example only):

    SERVER_HOST=site.com

    API_URL=/api
    WS_URL=/websockets

    ACCOUNT_URL=/user
    LANDING_URL=/

For production build you should set same variables except SERVER_HOST.

## Run

- Run ```npm start``` or ```npm run start``` to create production build and start production server

- Run ```npm run start:dev``` to start development server with development build in watch mode with hot-reloading

- Run ```npm run wstart``` to create production build and start production server on Windows machine

- Run ```npm run wstart:dev``` to start development server with development build in watch mode with hot-reloading on Windows machine

- Run ```npm run build``` to create production build

- Run ```npm run build:dev``` to create development build in watch mode

- Run ```npm run server``` to start only production server

## Explore

Open 0.0.0.0 or localhost on port 5005 for production build or 5006 for development build.
