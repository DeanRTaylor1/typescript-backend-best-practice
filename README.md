# typescript-backend-best-practice Repo

## Setup Dev Environment

- Clone repo
- npm install
- npm run postgres setup docker container with postgres
- npm run createdb createdb with required name
- npm run migrate-up
- npm run dev to run dev server with ts-node
- npm run test-ci will complete one test run and output coverage details

### Must have Docker Daemon installed and running to get db set up

## Features

1. Custom logging using morgan, Influenced by Gin Go framework
2. Custom Error handling
3. Create new db migration by using npm run create-migration -- migration-name
4. PASETO Bearer authentication
