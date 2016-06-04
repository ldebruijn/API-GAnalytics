'use strict';

const _ = require('lodash');

const MEASUREMENT_PROTOCOL_VERSION = 1;
const DEFAULT_DATA_SOURCE = 'API-GAnalytics';

class General {

    constructor(trackingId, options) {
        options = options || {};

        this.setTrackingId(trackingId);
        this.v = MEASUREMENT_PROTOCOL_VERSION;
        this.ds = options.hostname || DEFAULT_DATA_SOURCE;
    }

    setTrackingId(trackingId) {
        if (_.isString(trackingId)) {
            this.tid = trackingId;
        }
    }
}

module.exports = General;
