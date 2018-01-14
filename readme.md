# What is Pablo?

Pablo is a task runner for the web.

It can run and chain task together, much like IFTTT and Zapier.

It is written in TypeScript and NodeJs, and has a panel built with Angular 1.x

## How to run?

to install, run

> npm install

to build, run

> gulp build

create two files in root directory called:

> .env.test   .env.prod

these files hold test and production environment variables, respectively. There is a sample file in root directory called .env.sample

to start with test environment variables, run

> npm run debug

to start with production environment variables, run

> npm start