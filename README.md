# Next15 Starter Template

## Development Environment Setup
- Copy .env.example to .env
- Enter Postgres DB creds in the .env
- Follow the guide below.

### Installing Node v23 with fnm and pnpm

```sh

curl -o- https://fnm.vercel.app/install | bash

source $HOME/.bashrc

fnm install 23

node -v # Should print "v23.6.1".

corepack enable pnpm

pnpm --version # actually this line enables it

cd project_folder

pnpm --version

pnpm install

```

## Install and create database

### Postgres installation

```sh
sudo apt update
sudo apt upgrade
sudo apt install net-tools unzip
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

.env file (place you own params): 
` DATABASE_URL="postgresql://[my_user]:[password]@localhost:5432/[db_name]?schema=[schema_name]" `

Based on the connection string above, adjust parameters and run commands:

```sh
sudo -u postgres psql
```

```sql
CREATE DATABASE db_name;
CREATE USER my_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE db_name TO my_user;
```

### Run development server

- Create schema tables by pushing with prisma: `pnpm db:push`

- And run dev server: `pnpm dev`


Usege of .env in the project
- `import { env } from 'src/lib/env';`
