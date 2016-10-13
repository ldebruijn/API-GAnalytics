'use strict';
const _ = require('lodash');

const General = require('./lib/models/general');
const Session = require('./lib/models/session');
const Event = require('./lib/models/event');
const Pageview = require('./lib/models/pageview');
const Exception = require('./lib/models/exception');
const RequestBody = require('./lib/models/requestbody');
const Request = require('./lib/request');

var general;
var options;

module.exports = function(trackingId, _options) {
    if (!_.isString(trackingId)) {
        throw new Error('Google Analytics Tracking ID must be a string');
    }

    options = _options || {};
    options.userId = options.userId || [];
    options.debug = options.debug || false;

    general = new General(trackingId, options);
};

module.exports.track = (req, res, next) => {
    let session = new Session(req, options);
    let event = new Event(req, res);
    let pageview = new Pageview(req);

    let requestBody = new RequestBody(req, general, session)
        .setEvent(event)
        .setPageview(pageview);

    let request = new Request(requestBody, options.debug);
    request.send();

    next();
};

module.exports.exception = (err, req, res, next) => {
    let session = new Session(req, options);
    let event = new Event(req, res);
    let pageview = new Pageview(req);
    let exception = new Exception(err);

    let requestBody = new RequestBody(req, general, session)
        .setEvent(event)
        .setPageview(pageview)
        .setException(exception);

    let request = new Request(requestBody, options.debug);
    request.send();

    next();
};

