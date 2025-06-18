# issuetracker
A robust, production-ready REST API for an Issue Tracker system using Node.js and PostgreSQL.

**Features**
1. User authentication using JWT
2. Project & issue management
3. Comments on issues
4. Pagination & filtering
5. Swagger API documentation
6. CI/CD with GitHub Actions
7. Dockerized setup

**Tech Stack**
1. Node.js, Express
2. Prisma ORM + PostgreSQL
3. JWT Authentication
4. Docker, Docker Compose
5. GitHub Actions (CI/CD)

**Local Development Setup**
1. Clone Repository: git clone https://github.com/Akshat0610/issuetracker.git
2. Navigate inside project
3. Enter cmd: npm i
4. Create .env file with following details:
      DATABASE_URL=postgresql://user:password@localhost:5432/issuetracker
      JWT_SECRET=your_jwt_secret
5. Run DB: docker-compose up -d db
6. Generate Prisma client & migrate:
      npx prisma generate
      npx prisma migrate dev --name init
7. Start server using: npm run dev
   
**API documentation:** http://localhost:3000/api-docs
