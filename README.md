# Intro to Express

Welcome to the world of backend! In this unit, we'll learn about:

* **Backend** — the part of the application that the user can't access. For our purposes, this means a server application and a database.
  * **Server Applications** — Application to receive requests and send back resources.
    * **Express** — The npm package we'll use to build a server application.
  * **Databases** — A place to put data and have it persist, even if the server turns off.
    * **Postgres** — The type of database we'll use (tables, records, fields/properties).
    * **SQL** — The language used to execute database commands.
    * **Knex** — The npm package we'll use to send SQL queries to our Postgres database from our server application.
  * **Model-Controller Design** — A framework for organizing the layers of software that make up the backend.

By the end of this unit you will be able to build an application using the [React + Express + Auth Template](https://github.com/The-Marcy-Lab-School/react-express-auth).

In this first lesson, we're going to learn the basics of Express and build and deploy a simple server application.

**Table of Contents:**
- [Terms](#terms)
- [Setup](#setup)
- [Client Server Interactions](#client-server-interactions)
  - [The Express `app`](#the-express-app)
- [Endpoints and Controllers](#endpoints-and-controllers)
- [Host \& Ports](#host--ports)
- [Challenge](#challenge)

## Terms

* **Server Application** — an application that listens for requests and sends responses.
* **Host** and **Port** - the address of a server application
* **Endpoint** — a specific URL path of a server that clients can "hit" (send requests to) to create/read/update/delete data. For example: `/api/data` or `/api/users/:id` 
* **Express `app`** — an object that "listens" for requests and "routes" to the appropriate controller.
* **Controller** — a callback function that parses a request and sends a response for a particular endpoint

## Setup

* Create a new repo in GitHub called `first-express-server`. Make sure to add a `.gitignore` template with `Node` selected. Include a **README.md** file where you can take notes.
* Clone it down
* Create a new folder called `server` and `cd` into it
* Run `npm i express`
* Run `npm i -g nodemon`
* Create a `index.js` file
* Run `nodemon index.js` to run your file. Each change you make will cause the file to re-run. <kbd>Ctrl + C</kdb> to turn off the server.

## Client Server Interactions

So how do the client and server interact?

1. A client sends a **request** to the server
1. The server receives the request and **routes** it to the proper **controller**
1. The controller parses the request and sends a **response**
1. The client receives the response and renders the data!
  
![](./images/express-diagram-simple.svg)

**<details><summary style="color: purple">Q: What are the responsibilities of a client?</summary>**

- Rendering HTML, CSS, and JS
- Request information from a server (get requests)
- Providing information to a server (post/patch/delete requests)
- Reading data received from a server

</details>

**<details><summary style="color: purple">Q: What are the responsibilities of a server?</summary>**

- Serving static files that live on the server (HTML, CSS, and JS files)
- Fetching and serving data from a third-party API that requires an API key
- Managing and serving data from the server's own database

</details>

### The Express `app`

The main export of Express is the `express` function which creates an object, often named `app` or `server`.

```js
const express = require('express');
const app = express();
```

This `app` object is the hub of the server application. It will:
* **Listen:** Wait for incoming requests and...
* **Route:** Direct each request to a **controller** based on the specific **endpoint** of the request

Here is a simple example. For now, just focus on the high-level structure of the application. Look for **controllers**, **endpoints**, and where the app "listens".

```js
const express = require('express');
const app = express();

// controllers
const serveIndex = (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
}
const serveAbout = (req, res, next) => {
  res.send('<h1>About</h1>');
}
const serveData = (req, res, next) => {
  res.send([ { name: 'ben' }, { name: 'zo' }]);
}
const serveHello = (req, res, next) => {
  res.send('hello');
}

// endpoints
app.get('/', serveIndex);
app.get('/about', serveAbout);
app.get('/api/hello', serveHello);
app.get('/api/data', serveData);

// listen
const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 
```

* `const app = express()` creates the Express `app` object
* A **controller** is a callback function that parses a request and sends a response. It will be invoked by the `app` when the associated path is hit.
* `app.get(endpoint, controller)` defines which `controller` will be invoked for the specified `endpoint`.
* `app.listen(port, callback)` "starts" the server application. Since the application is running locally, it will be accessible at `http://localhost:8080` where `8080` is the port. All of the endpoints above are extensions of this host and port.

Let's look closer at how to make a controller.

## Endpoints and Controllers

Controllers are callbacks invoked by the `app` when the associated endpoint is hit. They are ALWAYS invoked with three values:
* `req` — an object with data about the incoming request
* `res` — an object with functions for sending a response
* `next` — a function to execute the next controller (we'll learn more about this soon)

```js
// controllers
const serveIndex = (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
}
const serveAbout = (req, res, next) => {
  res.send('<h1>About</h1>');
}
const serveData = (req, res, next) => {
  res.send([ { name: 'ben' }, { name: 'zo' }]);
}
const serveHello = (req, res, next) => {
  res.send('hello');
}

// endpoints
app.get('/', serveIndex);
app.get('/about', serveAbout);
app.get('/api/hello', serveHello);
app.get('/api/data', serveData);
```

* To keep things simple, these controllers only make use of the `res` object 
* The `res.send` and `res.sendFile` methods allow us to send different kinds of data. `res.sendStatus` lets us send just a status code with no data.
* When sending files, the `__dirname` keyword returns the absolute path to the folder containing the current file.
* The associated endpoints for each controller begin with `/` and are appended to the host:port
  * e.g. `http://localhost:8080/about` will trigger the `serveAbout` controller

**<details><summary style="color: purple">Q: Why do you think the `serveHello` and `serveData` endpoints begin with `/api` while the other two endpoints do not?</summary>**
> Typically, endpoints that serve data will begin with `/api` while endpoints that serve HTML do not.
</details><br>

**<details><summary style="color: purple">Q: What does `.get` mean? Why is it called that?</summary>**
> These endpoints are designed to handle GET requests. If we wanted to assign controllers for endpoints that handle POST/PATCH/DELETE requests, we could use `app.post` or `app.patch` or `app.delete`.
</details><br>

## Host & Ports

![](images/host-port.png)

Host is like our home address.

* `localhost` is a hostname that refers to the current device used to access it. 
* `localhost` is an alias for `127.0.0.1` which is the standard address used. 
* `localhost === 127.0.0.1`

Ports are the "front doors" of our application. (There are are a lot of doors!)

* `:8080` is considered as a different "door" from `:5500`

Which port should you use? It doesn't really matter, but here are some ones that our instructors like to use and some standards that are used:
* `8080` (What I use)
* `4321` (Mike's favorite because its fun)
* `3000` (What other people use)
* `5500` (What other other people use)
* `80` (Standard unencrypted HTTP port)
* `443` (Standard encrypted HTTPS port)

Just pick one that isn't being used! 

> How do you know which ones aren't being used? Your computer will likely tell you if one is currently in use — just use a different one (or kill the process that is currently using that port).

## Challenge

In `server/index.js`, write a server application using Express that has at least 4 endpoints for GET requests:
* Two of the endpoints should return HTML (try making a file and sending the file!)
* Two of the endpoints should return data (try sending an array of objects!)

It is entirely up to *you* to decide which endpoints your server makes available. However, it is a best practice to:
* start endpoints that provided data with `/api`
* start endpoints that provide HTML with `/`

When you've built your server, visit http://localhost:8080 (or whatever port number you chose) and test out your server!

When you're done, push your code to github and [follow these steps to deploy using Render](https://github.com/The-Marcy-Lab-School/render-deployment-instructions).

[Here is an example of a deployed server!](https://github.com/benspector-mls/first-express-server-f23-test)