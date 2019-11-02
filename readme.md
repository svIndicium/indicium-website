# Website for SV Indicium
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=svIndicium_website-2019&metric=alert_status)](https://sonarcloud.io/dashboard?id=svIndicium_website-2019)
[![Build Status](https://travis-ci.com/svIndicium/indicium-website.svg?branch=master)](https://travis-ci.com/svIndicium/indicium-website)
> Indicium website 2019 made with NuxtJS(VueJS)

## Dev Setup
Node version: `10.8.0`
NPM version: `6.10.1`

## Install plugins to your IDE:
* editorconfig
* eslint 

``` bash
npm run install

npm run dev
```

## Build and Run via Docker
```bash
docker build -t website-indi .

docker run indicium-website -p 3000:80 -d
```
