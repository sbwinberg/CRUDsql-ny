# CRUDsql
- npm init -y
- npm i express
- npm i dotenv
- npm i pg
- npm i joi
- npm i @joi/date
- npm i -d typescript ts-node nodemon @types/node @types/express
- npx tsc --init --target ES2020 --module commonjs --strict --esModuleInterop --skipLibCheck --forceConsistentCasingInFileNames --outDir ./dist

# create a 'development.env' file in the root dir and fill out the data
SERVER_PORT=1337
SERVER_HOSTNAME=localhost

DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=
DB_PASSWORD=
DB_PORT=5432

# create a database localy on pgadmin
# you find dummy data for postgres database in 'SQL_dummy_data.txt' stick to the following format

# API endpoints
http://localhost:1337/				Landingpage GET

http://localhost:1337/user			GET, POST
http://localhost:1337/user/:id	    PUT, PATCH, DELETE

http://localhost:1337/post			GET, POST
http://localhost:1337/post/:id		PUT, PATCH, DELETE

http://localhost:1337/spec1			GET
http://localhost:1337/spec2			GET
http://localhost:1337/spec3			GET