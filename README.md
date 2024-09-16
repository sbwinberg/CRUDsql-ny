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
index.ts
http://localhost:1337/	    Landingpage     GET

user.ts
http://localhost:1337/user			        GET, POST
http://localhost:1337/user/:id	            PUT, PATCH, DELETE

post.ts
http://localhost:1337/post			        GET, POST
http://localhost:1337/post/:id		        PUT, PATCH, DELETE

spec.ts
http://localhost:1337/spec1			        GET
http://localhost:1337/spec2			        GET
http://localhost:1337/spec3			        GET

testRoutesCheckAuthorization.ts
http://localhost:1337/user-only		        GET
http://localhost:1337/admin-only	        GET
http://localhost:1337/content-managment		GET
http://localhost:1337/user-profile	        GET

login.ts
http://localhost:1337/login                 GET
http://localhost:1337/auth/github	        GET
http://localhost:1337/auth/github/callback  GET

