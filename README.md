
![casCade Logo with Internet Arcade citation](./src/assets/documentation/casCade-Logo-sc.png)
# [casCade &#8211; A Classic Arcade Web App](https://cascade-app.herokuapp.com/)

## About

CasCade is a classic arcade single-page application. This application provides an intuitive front-end layout powered by Archive.org’s Internet Arcade collection. I made this application to provide an easy-to-use, inviting design that allows users to access and play their arcade favorites. 

This application offers multiple views to access the game library, including Library, Favorites, Search, and Shuffle. This app was built using React, RESTful APIs via [json-server](https://github.com/typicode/json-server), [notistack notification library](https://github.com/iamhosseindhv/notistack), and styled with [Material-UI](https://github.com/mui-org/material-ui).

## Getting Started

### Online Demo

A working demo is available on Heroku<sup id="a1">[1](#f1)</sup> at [https://cascade-app.herokuapp.com/](https://cascade-app.herokuapp.com/).

Register a new account<sup id="a2">[2](#f2)</sup> or use the email address `test@test.com` to login and browse the app.

### Local Installation

1.  Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
    - If Node.js and npm are already installed, use `node -v && npm -v` to check the version and verify that both versions are `v10.24.1` & `6.14.13` or greater.
    - If the version is older than the minimum requirement, update to the latest stable version of [node](https://docs.npmjs.com/try-the-latest-stable-version-of-node) & [npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm).
2. Use `https` or `SSH` to clone the project folder to a local directory:
    ```Bash
    $ git clone ...
    ```
3. From the cloned project directory:
    ```Bash
    $ npm install
    ```
4. Install the JSON Server node package:
    ```Bash
    $ npm install -g json-server
    ```
5. Navigate ⬆ up from the cloned project one directory level, create a new directory and copy the default database.json file:
    ```Bash
    $ cd .. && mkdir ./casCade-database && cp ../casCade/api-base/database.json ./casCade-database
    ```
6. Change to the casCade-database directory and launch JSON Server:
    ```Bash
    $ json-server --watch default-entries.json --port 8088
    ```
7.  Use your preferred code editor to find & replace the string `https://cascade-app.herokuapp.com/` with `http://localhost:8088/` in the following files:
    - `./src/components/auth/Login.js`
    - `./src/components/auth/Register.js`
    - `./src/components/favorites/FavoritesProvider.js`
8. From the project root directory, run the following:
    ```Bash
    $ npm start
    ```
9. Once casCade loads in the browser, click the Register tab to sign up for a new account and login.


---

## Footnotes
- <b id="f1">[1]</b> Heroku will periodically cycle apps into a [sleep state](https://blog.heroku.com/app_sleeping_on_heroku), please allow an additional moment on first load.  [↩](#a1)
- <b id="f1">[2]</b> Heroku will reset the `json-server` database to its default state from time to time, expect all demo account data to be removed.

---
...in progress