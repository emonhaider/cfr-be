# CFR

## Description

A mono-repo created using the [NestJS framework](https://nestjs.com/). that hosts the backend for system that processes Code of Federal Regulation. The project contains few different sub projects

- API
  - A RESTful API service built with NestJS that retrieves CFR data from a database and S3 storage. This service is deployed on AWS Lambda with an API Gateway facade.
- Worker
  - A service responsible for processing CFR data and storing it in the database and file storage system. This service can be triggered by events within the system or scheduled to run at intervals. AWS EventBridge can be used for triggering the worker service.
- Infra
  - Infrastructure as Code (IaC) definitions written in TypeScript using AWS CDK to deploy the necessary resources for the system on AWS.
- Library
  - Database
    - A shared library used by both the Worker and API to interact with the database.
  - File Storage
    - A shared library used by both the Worker and API to interact with the file storage system.

## Installation

- Copy [.env.example](.env.example) as `.env` and fill out variables.

```bash
npm install
```

## Running the API

```bash
# development
$ npm run start # runs the api by default
$ npm run start worker.cfr-processor # runs worker locally

# watch mode
$ npm run start:dev


# deploying the resources to AWS
$ cd infra
$ export AWS_PROFILE=<profile> # only needed if you have multiple profiles configured
$ npx cdk deploy
```
