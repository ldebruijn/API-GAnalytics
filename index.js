'use strict';
const _ = require('lodash');

const General = require('./lib/models/general');
const Session = require('./lib/models/session');
const Event = require('./lib/models/event');
const Pageview = require('./lib/models/pageview');
const Exception = require('./lib/models/exception');
const RequestBody = require('./lib/models/requestbody');
const Request = require('./lib/request');

module.exports = function(trackingId, options) {
    if (!_.isString(trackingId)) {
        throw new Error('Google Analytics Tracking ID must be a string');
    }

    options = options || {};
    options.userId = options.userId || 1;
    options.debug = options.debug || false;

    const general = new General(trackingId, options);

    return (err, req, res, next) => {
        if (err) {
            console.log('Error received!', err);
        }
        let session = new Session(req, options);
        let event = new Event(req, res);
        let pageview = new Pageview(req);
        let exception = new Exception(err);

        let requestBody = new RequestBody(req, general, session)
            .setEvent(event)
            .setPageview(pageview)
            .setException(exception);

        let request = new Request(requestBody);
        request.send();
        
        next(err);
    }
};
