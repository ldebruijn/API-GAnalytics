# API-GAnalytics
> NodeJS API analytics using Google Analytics.

This module is Express middleware which utilizes the [Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#overview) and sends statistics from incomming requests to Google Analytics enabling you to keep track of realtime events on your API.

The module is based on the workings of [Nodalytics](https://github.com/tjanczuk/nodalytics), but plans are to improve functionality.

## Installation

`$ npm install api-ganalytics`

# Express example

```js
var express = require('express');
var Analytics = require('api-ganalytics');

var app = express();

app.use(Analytics('YOUR GOOGLE ANALYTICS TRACKING ID HERE'));

app.get('/', function(req, res) {
  res.send('Hello API-GAnalytics');
});

app.listen(3000);
