# Website for SV Indicium
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=svIndicium_website-2019&metric=alert_status)](https://sonarcloud.io/dashboard?id=svIndicium_website-2019)
[![Build Status](https://travis-ci.com/svIndicium/indicium-website.svg?branch=dev)](https://travis-ci.com/svIndicium/indicium-website)
> Indicium website 2019 made with NuxtJS(VueJS)

## Dev Setup
Node version: `10.8.0`
NPM version: `6.10.1`
# Install Guide
Download and install [Node.js](https://nodejs.org/en/) LTS version is fine.
You do not need chocolaty to work on this project.
After install restart your pc

## Install and run with VS Code
Download [VS Code](https://code.visualstudio.com/download) (if you haven't already)
### VS Code plugins
* EditorConfig (EditorConfig)
* ESlint (Dirk Baeumer)
* npm (egamma)
* Vetur (pine WU)
* Debugger for Chrome (Microsoft) (optional)
* Task runner (Sana Ajani) (Very optional)

### Run file
1st run: Run the install task from the Task Runner

![image](https://user-images.githubusercontent.com/22635990/109289352-60059100-7826-11eb-88ff-d38828a57a57.png)

Or use `Ctrl+Shift+P` to open tasks and select npm install

To run the program, Run the task dev.
At first run you can select no on the data collection prompt in the terminal.

## Other IDE's
### Install plugins to your IDE:
* editorconfig
* eslint

### CMD
``` bash
npm run install
npm run dev
```

## Build and Run via Docker
```bash
docker build -t website-indi .

docker run indicium-website -p 3000:80 -d
```
