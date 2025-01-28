# Next15 Starter Template

## Development Environment Setup
- Copy .env.example to .env
- Enter Postgres DB creds in the .env
- Follow the guide below.

## Install and create database

### Postgres installation

```sh
sudo apt update
sudo apt upgrade
sudo apt install net-tools # (optional for netstat)
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
sudo apt install postgresql postgresql-contrib

# (optional) 
sudo service postgresql restart
sudo service postgresql status

# (optional) Confirm that PostgreSQL is listening on the correct port (5432):
sudo netstat -plnt | grep 5432

# (optional) Testing Connection with psql
psql -h localhost -U my_user -d db_name -W
```

### Creating database and user

Make sure .env file is set up correctly (place you own params): 
` DATABASE_URL="postgresql://[my_user]:[password]@localhost:5432/[db_name]?schema=[schema_name]" `

Based on the connection string above, adjust parameters and run commands:

```sh
sudo -u postgres psql
```

```sql
CREATE DATABASE db_name;
CREATE USER my_user WITH PASSWORD 'password';
ALTER USER my_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE db_name TO my_user;
```



### Installing Node with fnm and pnpm

fnm and pnpm are not required but it's nice to have, even in production server.

```sh
sudo apt install unzip # required for bash in the next step

curl -o- https://fnm.vercel.app/install | bash

source $HOME/.bashrc

fnm install 23

node -v # Should print node version

corepack enable pnpm

cd project_folder

pnpm --version

pnpm install

```




### Run development server
- And run dev server: `pnpm dev`
- open `http://localhost:3000/` in the browser

