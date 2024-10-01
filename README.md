# set up in terminal
npm i
npx prisma init????
npx prisma generate
npx prisma migrate dev

# create a '.env' file in the root dir and fill out the data
DATABASE_URL=postgresql://postgres:YOURPASSWORD@localhost:5432/YOURDATABAS?schema=public
SERVER_PORT=1337
SERVER_HOSTNAME=localhost

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# API endpoints
campaign.ts
http://localhost:1337/campaign			        GET, POST
http://localhost:1337/campaign/:id	            PUT, PATCH, DELETE
http://localhost:1337/user			            GET, POST

# TEST CASES
POST Campaign
{
  "companyName": "Tech Innovations AB",
  "companyDescription": "A leading provider of innovative tech solutions.",
  "productDescription": "Our flagship product is a cloud-based platform for project management.",
  "targetAudience": "Small to medium-sized tech companies.",
  "userId": "GLÖM INTE TA ID FRÅN EN ANVÄNDARE SOM FINNS",
  "emails": [
    {
      "subject": "Welcome to Tech Innovations!",
      "content": "We are thrilled to have you on board. Here's what you can expect.",
      "recipients": ["client1@company.com", "client2@company.com"]
    },
    {
      "subject": "Introducing Our Latest Features",
      "content": "Our platform just got better! Check out the new updates we've rolled out.",
      "recipients": ["client3@company.com", "client4@company.com"]
    }
  ]
}

POST User
{
    "name": "Jesn",
    "email": "Jesn@hotmail.com",
    "password": "jesn1337"
}