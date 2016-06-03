'use strict';

const _ = require('lodash');
const General = require('./lib/models/general');

module.exports = function(trackingId, options) {
    if (!_.isString(trackingId)) {
        throw new Error('Google Analytics Tracking ID must be a string');
    }

    options = options || {};
    options.clientId = options.clientId || undefined;
    options.debug = options.debug || false;

    const general = new General(trackingId, options);
};
