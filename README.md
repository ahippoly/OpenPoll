# OpenSurvey

## Instalation and usage

### Front-end

This is a the front app of the application in react, dont forget to set your env as the .env.example

```shell
yarn install

yarn dev
```

### Back-end

This one is just to upload files with web3.storage be sure to put your API_KEY in .env

```shell
yarn install

node index.mjs
```

### Smart-contracts

this one is using the foundry test framework 

```shell
forge build

forge deploy
```