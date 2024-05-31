# CFR

## Description

A mono-repo created using the [NestJS framework](https://nestjs.com/). that hosts the backend for system that processes Code of Federal Regulation. The project contains few different sub projects

- API
  - REST API service to fetch CFR data from the database and S3. Hosted on AWS Lambda and fronted by API Gateway
- Worker
  - A service that will process the CFR and store the data in database and the file storage system. This service can be triggered by another event in the system or to run on an scheduled interval. AWS EventBridge can be used trigger it.
- Infra
  - Infrastructure as code created using AWS CDK and Typescript to deploy necessary resources for the system
- Library
  - Database
    - Library shared by Worker and API to communicate with the database
  - File Storage
    - Library shared by Worker and API to communicate with file storage

## Installation

- Copy [.env.example](.env.example) as `.env` and fill out variables.

```bash
$ npm install
```

## Running the API

```bash
# development
$ npm run start # runs the api by default
$ npm run start worker.cfr-processor # runs worker locally

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
