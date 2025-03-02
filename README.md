# InventoryWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Comandos utilizados - Angular
ng new inventory-web --no standalone

### Dashboard
ng g m modules/dashboard/dashboard --flat

ng g c modules/dashboard/pages/dashboard --flat
ng g c modules/dashboard/components/home

### Shared
ng g m modules/shared/shared --flat
ng g c modules/shared/components/sidenav

ng add @angular/material
ng g m modules/shared/material --flat

### Categorías
ng g m modules/category/category --flat
ng g c modules/category/components/category

ng g s modules/shared/services/category
ng g s modules/shared/services/config

ng g c modules/category/components/AddCategory

ng g c modules/shared/components/confirm --module shared.module

### Productos
ng g m modules/product/product --flat

ng g c modules/product/components/product

ng g s modules/shared/services/product

ng g c modules/product/components/SaveProduct

### Keycloak
npm install keycloak-angular keycloak-js
ng g s modules/shared/services/AuthService
ng generate guard core/guards/auth


## Comandos utilizados - Docker

### General
docker network create inventory-net
docker volume create mysql_data

### MySQL
docker volume create mysql_data
docker volume create keycloak_data

docker pull mysql:8.0.41

docker run -p 3306:3306 --name docker-mysql --network inventory-net -e MYSQL_ROOT_PASSWORD=R00tjl81* -v mysql_data:/var/lib/mysql -d mysql:8.0.41 --default-authentication-plugin=caching_sha2_password --ssl=ON


### Keycloack
docker run --name keycloak-build -v keycloak_data:/opt/keycloak/data -e KC_DB=mysql -e KC_DB_URL=jdbc:mysql://docker-mysql:3306/keycloak_db?useSSL=true -e KC_DB_USERNAME=keycloak -e KC_DB_PASSWORD=Keycl0ak! quay.io/keycloak/keycloak:26.1.2 build

docker run -d --name keycloak --network inventory-net -v keycloak_data:/opt/keycloak/data -v C:\certificados:/etc/x509/https -p 8443:8443 -p 9000:9000 -e KC_DB=mysql -e KC_DB_URL=jdbc:mysql://docker-mysql:3306/keycloak_db?useSSL=true -e KC_DB_USERNAME=keycloak -e KC_DB_PASSWORD=Keycl0ak! -e KC_HOSTNAME=localhost -e KC_HTTP_ENABLED=true -e KC_HTTP_PORT=8080 -e KC_HTTPS_PORT=8443 -e KC_HTTPS_CERTIFICATE_FILE=/etc/x509/https/tls.crt -e KC_HTTPS_CERTIFICATE_KEY_FILE=/etc/x509/https/tls.key -e KC_HEALTH_ENABLED=true -e KC_METRICS_ENABLED=true -e KC_LOG_LEVEL=INFO -e KC_CACHE=local -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=Admin123! quay.io/keycloak/keycloak:26.1.2 start

------
docker exec -it keycloak /opt/keycloak/bin/kc.sh bootstrap-admin user --username:env KEYCLOAK_ADMIN --password:env KEYCLOAK_ADMIN_PASSWORD
docker exec -it keycloak /opt/keycloak/bin/kc.sh start bootstrap-admin user --username:env KEYCLOAK_ADMIN --password:env KEYCLOAK_ADMIN_PASSWORD
