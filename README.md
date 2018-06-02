# KONA

> A simple REST backend server that scales easily.

## Get Started

It's simple, run `git clone https://github.com/iowljs/kona.git && cd kona && git checkout stable && npm install`, to start the server, either run `npm start` *or* `node bin/server.js`

## Why Kona?

Kona was designed out of a personal need for a small, and scalable REST backend server for numerous web applications and mobile services. Battle-tested, and ironed over the past year, Kona has been running for all my personal projects fast, and without issues, in moderate-traffic environments.

## Magic Routing

We all want to just drop a file in, and run immediately - Kona has automagic routing, as-well-as predefined routing.

### Example Automagic Routing

Let's say the user entered the URL `/contact-us/submit` and no route existed for this page, but a contact-us controller does exist, it will instantiate said controller, it will try to find a method called submit, if it fails, it'll skip and let the response throw a failure message, however, on success, we instantiate the controller, call said method, and pass the request and response object to the controller method for direct handling. This automagic routing middleware is the last middleware called, intentionally, so all previous middleware must instantiate before it can route to controllers magically.

## Contributing

> Contributions are always welcome!