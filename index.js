'use strict';
const _ = require('lodash');

const General = require('./lib/models/general');
const Session = require('./lib/models/session');
const Event = require('./lib/models/event');
const Pageview = require('./lib/models/pageview');
const Request = require('./lib/request');

module.exports = function(trackingId, options) {
    if (!_.isString(trackingId)) {
        throw new Error('Google Analytics Tracking ID must be a string');
    }

    options = options || {};
    options.clientId = options.clientId || undefined;
    options.debug = options.debug || false;

    const general = new General(trackingId, options);

    return (req, res, next) => {
        let session = new Session(req, options);
        let event = new Event(req, res);
        let pageview = new Pageview(req);

        let request = new Request(req, general, session, event, pageview);
        request.send();
        
        next();
    }
};
