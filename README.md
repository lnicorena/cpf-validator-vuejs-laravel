# cpf, cnpj - validator

Single Page Application to manage and validate cpf, cnpj documents using VueJS, Laravel and MongoDB.

## Details

Application: `http://localhost:8080/`

Database host `127.0.0.1` and port `27017`

API: `http://localhost:8081/api`

API status: `http://localhost:8081/status`

API doc: `https://documenter.getpostman.com/view/9231626/SVzw511K?version=latest`

## How to configure

The following steps will guide you to get the app running.

## Back-end

Go in the `./server` directory and

#### Create the `.env` file:

\$ cp .env.example .env

#### Install the laravel dependencies:

\$ composer install --ignore-platform-reqs

#### Generate Laravel keys:

\$ php artisan key:generate

#### Compile and run the web and database server with docker:

\$ docker-compose up -d --build

## Front-end

Go in the `./client` directory and run the follow commands:

#### Setup the project:

yarn install

#### Compiles and hot-reloads for development

yarn serve

#### Compiles and minifies for production

yarn build

#### Run your unit tests

yarn test:unit

### Run your end-to-end tests

yarn test:e2e

### Lints and fixes files

yarn lint
