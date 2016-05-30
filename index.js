'use strict';
const url = require('url');
const https = require('https');

const Event = require('./lib/event');
const PageView = require('./lib/pageview');
const Client = require('./lib/client');
const Utils = require('./lib/utils');

var endpoint = '/collect';
var DEBUG = false;

var Analytics = function(trackingId, options) {
    var options = options || {};
    options.trackingId = trackingId;
    DEBUG = options.debug || false;

    if (typeof(options) !== 'object' || typeof(options.trackingId) !== 'string') {
        throw new Error('Google analytics tracking ID must be given as a parameter.');
    }

    options.clientId = options.clientId || 'sessionID';
    setupDebugging(options);

    return function(req, res, next) {
        var parsedUrl = url.parse(req.url);
        var headers = createHeaders(req);

        var client = new Client(options)
            .setClientID(req, options.clientId)
            .setClientIP(req.ip)
            .setLanguage(req, options.locale)
            .setUserAgent(req.headers['user-agent']);

        var cPayload = Utils.toUrlFormEncodedString(client);

        var event = new Event()
            .setEventAction(req.method)
            .setEventCategory(parsedUrl.pathname)
            .setEventLabel(res.statusCode);

        var ePayload = Utils.toUrlFormEncodedString(event);
        var payload = Utils.combineUrlEncodedStrings(cPayload, ePayload);

        sendRequest(payload, headers);

        var pageview = new PageView(options, req)
            .setHostname(req.hostname);
            

        var pPayload = Utils.toUrlFormEncodedString(pageview);
        payload = Utils.combineUrlEncodedStrings(cPayload, pPayload);

        sendRequest(payload, headers);

        return next();
    }
};

function sendRequest(payload, headers) {
    var request = https.request({
        hostname : 'www.google-analytics.com',
        port : 443,
        path : endpoint,
        method : 'POST',
        headers : headers
    }, function(response) {
        if (DEBUG) {
            response.setEncoding('utf8');
            response.on('data', function(data) {
                console.log('response=', data);
            })
        }
    });

    request.on('error', function(e){ if (DEBUG) { console.log('Error in request', e) } });
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

function setupDebugging(options) {
    if (options.debug === true) {
        endpoint = '/debug' + endpoint;
    }
}

module.exports = Analytics;