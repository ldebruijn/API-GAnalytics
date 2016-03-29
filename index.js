'use strict';

var https = require('https');
var url = require('url');
var Event = require('./lib/Event');

var Analytics = function(preferences) {
    var options = preferences || {};

    if (typeof(options) === 'string') {
        options = {};
        options.trackingId = preferences;
    }

    if (typeof(options) !== 'object' || typeof(options.trackingId) !== 'string') {
        throw new Error('Google analytics tracking ID must be given as a parameter.');
    }

    options.clientId = options.clientId || 'sessionID';

    return function(req, res, next) {
        var parsedUrl = url.parse(req.url);

        var event = new Event(options)
            .setVersion(options.version)
            .setClientId(req[options.clientId])
            .setEventAction(req.method)
            .setEventCategory(parsedUrl.pathname)
            .setEventLabel(parsedUrl.query)
            .setHitType('event');

        var payload = event.toFormUrlEncodedString();
        var headers = createHeaders(req);

        sendRequest(payload, headers);

        return next();
    }
};

function sendRequest(payload, headers) {
    var request = https.request({
        hostname : 'www.google-analytics.com',
        port : 443,
        path : '/collect',
        method : 'POST',
        headers : headers
    });

    request.on('error', function(e){ /*console.log(e, e.message)*/ });
    request.write(payload);
    request.end();
}

function createHeaders(req) {
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (!req) {
        return headers;
    }

    ['user-agent', 'x-forwarded-for', 'accept-language'].forEach(function (h) {
        if (req.headers[h] !== undefined) {
            headers[h] = req.headers[h];
        }
    });

    return headers;
}


module.exports = Analytics;