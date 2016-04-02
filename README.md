# API-GAnalytics
[![Build Status](https://travis-ci.org/ldebruijn/API-GAnalytics.svg?branch=master)](https://travis-ci.org/ldebruijn/API-GAnalytics) [![npm version](https://badge.fury.io/js/api-ganalytics.svg)](https://badge.fury.io/js/api-ganalytics)

> NodeJS API analytics using Google Analytics.

This module is Express middleware which utilizes the [Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#overview) and sends statistics from incomming requests to Google Analytics enabling you to keep track of realtime events on your API.

The module is based on the workings of [Nodalytics](https://github.com/tjanczuk/nodalytics), but plans are to improve functionality.

## Installation

`$ npm install api-ganalytics`

### Express example

```js
var express = require('express');
var Analytics = require('api-ganalytics');

var app = express();

app.get('/', function(req, res) {
  res.send('Hello API-GAnalytics');
});

app.use(Analytics('{YOUR_GOOGLE_ANALYTICS_TRACKING_ID}')); // <-- Below the routes!

app.listen(3000);
```

### Placement

The palcement of `app.use(Analytics('{YOUR_GOOGLE_ANALYTICS_TRACKING_ID}'));` is critical for the availability of some features.
For example, the pageview `path` property is only available after parsing of the request object, which is right after all custom middleware.
Therefor, `app.use(Analytics('{YOUR_GOOGLE_ANALYTICS_TRACKING_ID}'));` must be placed **BELOW** the route decleration.

### options

The API-GAnalytics middleware accepts a dictionary of options allowing you to modify the inner workings.
This section explains the individual options and their effects.
```js
var options = {
    clientId : [ 'user', 'id'],
    debug : false
};
```

#### clientId
ClientId is either a `string` or an `array` of object keys which will be used to fetch a clientId from the request object.
In this case, the `request` object contains a `user` object which has a field `id`. A visual representation would look like this:
```js
var request = {
    // ...
    user : {
        id : 1,
        name : 'API-GAnalytics'
        // ...
    }
    // ...
}
```

The clientId will be used to traverse the request object until a destionation is reached.

#### debug
Debug will put the module in debug mode. This means additional output where necessary and that the requests towards the Google
Analytics server will be redirected to their `/debug` endpoint. This allows for checking if the request sent is valid.
By default, debug is `false`.

## License

MIT License

Copyright (c) 2016 L. de Bruijn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
