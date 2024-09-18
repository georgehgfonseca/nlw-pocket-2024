# Backend server for pocket project

## Project installation

`npm init -y`

Install TypeScript

`npm i typescript -D`

Initialize TypeScript

`npx tsc --init`

Allows converting TS code to JS and running

`npm i @types/node tsx -D`

Framework to manage the server

`npm i fastify`

Biome - linting tool (similar to ESLint)

`npm i -D --save-exact @biomejs/biome`

Drizzle - ORM to manipulate the DB adn queries

`npm i drizzle-orm`
`npm i -D drizzle-kit`

Zod - data validation

`npm i zod`

Postgres database driver

`npm i postgres`

Create a migration

`npx drizzle-kit generate`

Run the migration

`npx drizzle-kit migrate`

View the database

`npx drizzle-kit studio`

Parallel drive for handling uuids

`npm i @paralleldrive/cuid2`

Date time library

`npm i dayjs`

Type provider for fastify

`npm i fastify-type-provider-zod`

For CORS management

`npm i @fastify/cors`

## Database

[Neon Tech](https://neon.tech/) - freemium hosting service for Postgres databases

Local - using Docker
`docker compose up -d`

## Running

`npm run dev`
