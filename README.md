# set up in terminal
npm i
npx prisma init
npx prisma generate
npx prisma migrate dev

# create a '.env' file in the root dir and fill out the data
DATABASE_URL=postgresql://postgres:YOURPASSWORD@localhost:5432/YOURDATABAS?schema=public
SERVER_PORT=1337
SERVER_HOSTNAME=localhost

# API endpoints
campaign.ts
http://localhost:1337/campaign			        GET, POST
http://localhost:1337/campaign/:id	            GET, PUT, DELETE
