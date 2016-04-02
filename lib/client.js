'use strict';
var utils = require('./utils');

var Client = function(options) {
    this.tid = options.trackingId;
    this.v = '1';
    this.uip = null;
    this.cid = null;
};

Client.prototype.setTrackingId = function(trackingId) {
    this.tid = trackingId || this.tid;
    return this;
};

Client.prototype.setClientIP = function(address) {
    if (address === '::1') {
        address = '127.0.0.1'
    }
    this.uip = address;
    return this;
};

Client.prototype.setClientID = function(req, clientId) {
    if (clientId == null || req == null) {
        return this;
    }

    if (!clientId instanceof Array) {
        clientId = [ clientId ];
    }

    this.cid = utils.traverseObjectByArray(req, clientId);
    return this;
};

Client.prototype.toFormUrlEncodedString = function() {
    return utils.objectToFormUrlEncodedString(this);
};


module.exports = Client;