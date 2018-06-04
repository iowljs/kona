# KONA

> A simple REST backend server that scales easily.

## Get Started

It's simple, run `git clone https://github.com/iowljs/kona.git && cd kona && git checkout stable && npm install`, to start the server, either run `npm start` *or* `node bin/server.js`

## Why Kona?

Kona was designed out of a personal need for a small, and scalable REST backend server for numerous web applications and mobile services. Battle-tested, and ironed over the past year, Kona has been running for all my personal projects fast, and without issues, in moderate-traffic environments.

### Features

With SSL baked in, Express and native server-to-server connections, optimized autoloading for production, you've at an advantage with Kona. We've learned from previous mistakes in production, and re-worked Kona to be fast, efficient, and developer friendly.

#### A refined Request and Response model

There's a lot you can do with the Request and Response, and we've made this simpler in Kona - we've abstracted the Request and Response object to make a simple and clean method to response to requests.

#### HTTP/2

It's on our road map, we're *wishing* for native Express support first, however, if you reverse proxy with nginx, you can *enable* http/2 as a temporary work around.

#### Server-to-server connections

Sometimes you have the server running on multiple locations, and want to keep data in sync, that does not require persistent storage, the server-to-server connection module will let you sync data cross nodes, anywhere in the world.

#### Email Built In

Simply send emails to anyone, with SMTP by default, and more libraries coming soon, you simply need to call `server.getEmailService()` and write your message, and call `send`.

#### Caching and CORS

By default, in production, all data that can be cached is cached, and gzipped. Cross-origin resource sharing is enabled for all routes, and preflight.

#### Winston Logging

We use Winston for logging, in the logs folder, they're named according to their type, and dated. For example, `application-error-log-%DATE%.log`.

#### Temporary Storage

Built-in to Kona is a temporary in-memory storage object, that is shared between all controllers, classes, models, and middleware can access it - in real time.

#### Controller-based with automagic routing

No longer do you need to hard-define paths (*unless you want to, you still can*), Kona automatically will attempt to find a controller and function to match URLs, if the hard-coded URL path does not already exist, if both options fail, the request will send an error message. **See Magic Routing section for details**

#### Database Baked In

By default, we've baked in generic support for SQL (MySQL, PostgreSQL) with Sequelize, with the database module.

#### Configuration based on environment

By default, Kona attempts to read the configuration files based on environment, including the default `env.js` and `email.js` files, and will fall back to trying to read environment variables by the requested key, for example if you run: `getConfig("NODE_ENV")`, it will try the configuration files, if not, it will try `process.env[{{ key }}]`, otherwise, it will fallback to null as the response.

#### Classmaps

The optimizer script will generate a static classmap you can utilize in your application to pinpoint locations without scanning file directories or guessing paths improperly.

## Magic Routing

We all want to just drop a file in, and run immediately - Kona has automagic routing, as-well-as predefined routing.

### Example Automagic Routing

Let's say the user entered the URL `/contact-us/submit` and no route existed for this page, but a contact-us controller does exist, it will instantiate said controller, it will try to find a method called submit, if it fails, it'll skip and let the response throw a failure message, however, on success, we instantiate the controller, call said method, and pass the request and response object to the controller method for direct handling. This automagic routing middleware is the last middleware called, intentionally, so all previous middleware must instantiate before it can route to controllers magically.

## Contributing

> Contributions are always welcome! Please check out the issues, and open a pull request!

## Found an issue?

Open an issue, and we'll prioritize it and get it fixed as soon as possible!