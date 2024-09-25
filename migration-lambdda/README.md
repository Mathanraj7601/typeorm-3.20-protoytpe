# README #

###Prerequisite  :
* Install aws cli in your machine
* create aws profile with your access key and secret access key

###Install dependencies  :

`cd odyssey/odyssey-migration-lambda/`

`npm install`


###Provision development stack (one time process)
`./bin/provision.sh`

Ex : `./bin/provision.sh`

It will create four cloudformation stack in `us-east-1` region

`odyssey-development-migration-lambda-s3`

###Build project

`./bin/compile.sh`


Creating the initial migration:

`typeorm migration:generate -n initial`

Creating an [auto generated](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#generating-migrations) migration:

`typeorm migration:generate -n migration-name`

Creating an empty migration:

`typeorm migration:create --name migration-name`

###Deploy project
`./bin/deploy.sh`

If we run this command for the first time, then a new cloudformation stack
will be created in aws called `odyssey-development-migration-lambda`.
It comprises aws lambda `odyssey-development-migration-lambda`. whenever we create new migration file we need
to follow the above `Build project` and `Deploy project` steps, so that new changeset will be created in cloudformation
and application will be deployed.

Run or undo migrations:
```bash
{"cmd":"runMigrations"}
{"cmd":"undoLastMigration"}
```