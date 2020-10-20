# ISSUE: if we have more than 3 active topics it blocks all async operations
### NOTES: simple promises are well but http.get is NOT WORKING. 
### PULSAR blocks async operations as readdir, readFile, http.get, etc.

## Main stack

- NodeJS (^14)
- Pulsar (2.6.1)

## Installation

1. Install the pulsar-client library

For MacOS

```sh
$ brew install libpulsar
```

For Linux
You should install 2 packages into your Linux OS before npm i. See here:
https://pulsar.apache.org/docs/en/client-libraries-cpp/

If it doesn't work. Please read here:
https://pulsar.apache.org/docs/en/develop-cpp/#docsNav

Not working and existing for Windows

2. Start Pulsar
```sh
docker-compose up -d
```

3. Install dependencies
```sh
npm install
```

## Run project

```sh
npm run start
```
