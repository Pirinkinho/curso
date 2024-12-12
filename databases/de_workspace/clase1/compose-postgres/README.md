
# `Postgresql` & `PgAdmin` `powered by compose`.

## Requirements:

- docker >= 17.12.0+
- docker-compose

## Quick Start.

- Clone or download this repository

   (`GitHub` → `albaniles-digitales` → `workspace`)

  - Desde http

       ```bash
       git clone https://github.com/albaniles-digitales/workspace.git
       ```

  - Desde ssh (esta no pide usuario y contraseña cada vez que haces git push)

       ```bash
       git clone git@github.com:albaniles-digitales/workspace.git
       ```

- Go inside of directory:

   ```bash
   cd compose-postgres
   ```

- Run this command to **create vols folder**:

   ```bash
   mkdir pgadmin
   ```

- Run these commands to **set folder permissions**:

   ```bash
   sudo chown *user*:*user* pgadmin -R
   sudo chmod 777 pgadmin -R
   ```

- Run this command to **run the dockers**:

   ```bash
   docker-compose up -d
   ```

- Run this command to **check docker status**:

   ```bash
   docker ps -a
   ```

- Run this command to **stop and remove the dockers**:

   ```bash
   docker-compose down
   ```

## Environments.

This **Compose file** contains the following environment variables:

- `POSTGRES_USER` the default value is **postgres**
- `POSTGRES_PASSWORD` the default value is **changeme**
- `PGADMIN_PORT` the default value is **5050**
- `PGADMIN_DEFAULT_EMAIL` the default value is <pgadmin4@pgadmin.org>
- `PGADMIN_DEFAULT_PASSWORD` the default value is **admin**

## Access to `postgres`:

- **Host**: postgres
- **Username:** postgres (as a default)
- **Password:** changeme (as a default)

## Access to `PgAdmin`:

- **URL:** <http://localhost:5050>
- **Username:** <pgadmin4@pgadmin.org> (as a default)
- **Password:** admin (as a default)

## Add a new server in `PgAdmin`:

- **Host name/address** `postgres`
- **Port** `5432`
- **Username** as `POSTGRES_USER`, by default: `postgres`
- **Password** as `POSTGRES_PASSWORD`, by default `changeme`
