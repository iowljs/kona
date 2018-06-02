# KONA

> A simple REST backend server that scales easily.

## Get Started

It's simple, run `git clone https://github.com/iowljs/kona.git && cd kona && git checkout stable && npm install`, to start the server, either run `npm start` *or* `node bin/server.js`

## Why Kona?

Kona was designed out of a personal need for a small, and scalable REST backend server for numerous web applications and mobile services. Battle-tested, and ironed over the past year, Kona has been running for all my personal projects fast, and without issues, in moderate-traffic environments. Run with PM2, and Service Offloading (**see details below**), allowing for faster response times without giving up any crutical features.

### Service Offloading

Service Offloading is a coined term, meaning you can offload requests across servers to be completed, and also use said servers as in-memory storage gateways.

In practical usage, Service Offloading should be used when there is a need to run a task non-urgently, or when a large dataset must be processed in a different thread. By default, every Kona instance will spin up a public environment, and an internal-only environment. The Service Finder API will automatically detect the offloader, and open a direct connection using a shared key for proof-of-authentication. Payloads sent are JSON-stringifed instruction blobs, and the caller will get a JSON payload in response, these look like this:

#### Initial Request

```json
{
    "SERVICE": "models/example.js",
    "ACTION": "getPublicDataset",
    "PARAMETERS": [
        1234
    ],
    "URGENCY": null,
    "REQUEST_SESSION_ID": 1234,
    "SEND_WHEN_COMPLETE": true
}
```

#### Response

```json
{
    "DELEGATED_FOR": {
        "REQUEST_SESSION_ID": 1234
    },
    "ACTION_COMPLETE_TIME": "__TIMESTAMP__",
    "DATASET": [
        {
            "USER_ID": 1234,
            "USERNAME": "BSMITH",
            "EMAIL_ADDRESS": "bsmith@example.com",
            "PUBLIC_NOTES": "This is a public note."
        }
    ],
    "URGENCY": null
}
```

### What happens when we get a response?

When a response is sent to the main server process, it's put in an in-memory queue, this queue is then checked on each user request, if there is additional data in this queue designated for the user, it will be added on to the user request in a field called "ADDITIONAL_DETAIL" - if there is no request that needs this detail anymore, or the user has left by the time this has came back, the data will be discarded from the in-memory cache, and will only be re-run when the user comes back. If the user's request header has a flag, respectively named, `X-BG-PROC-PRIORITY: 1`, it will force the background task to complete and respond before letting the user request finish.

## Magic Routing

We all want to just drop a file in, and run immediately - Kona has automagic routing, as-well-as predefined routing.

### Example Automagic Routing

Let's say the user entered the URL `/contact-us/submit` and no route existed for this page, but a contact-us controller does exist, it will instantiate said controller, it will try to find a method called submit, if it fails, it'll skip and let the response throw a failure message, however, on success, we instantiate the controller, call said method, and pass the request and response object to the controller method for direct handling. This automagic routing middleware is the last middleware called, intentionally, so all previous middleware must instantiate before it can route to controllers magically.