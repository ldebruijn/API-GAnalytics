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

app.use(Analytics('{YOUR_GOOGLE_ANALYTICS_TRACKING_ID}'));

app.get('/', function(req, res) {
  res.send('Hello API-GAnalytics');
});

app.listen(3000);
```


## License

ISC License:
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC") 
Copyright (c) 1995-2003 by Internet Software Consortium

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND ISC DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL ISC BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
