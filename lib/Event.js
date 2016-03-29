'use strict';

var Event = function(options) {
    this.v = 1;
    this.tid = options.trackingId || '';
    this.cid = 'NA';
    this.ea = null;
    this.el = null;
    this.ec = null;
    this.t = 'event';
};

Event.prototype.setVersion = function(version) {
    this.v = version || this.v;
    return this;
};

Event.prototype.setTrackingId = function(trackingId) {
    this.tid = trackingId || this.tid;
    return this;
};

Event.prototype.setClientId = function(clientId) {
    this.cid = clientId || this.cid;
    return this;
};

Event.prototype.setEventAction = function(eventAction) {
    this.ea = eventAction || this.ea;
    return this;
};

Event.prototype.setEventLabel = function(eventLabel) {
    this.el = eventLabel || this.el;
    return this;
};

Event.prototype.setEventCategory = function(eventCategory) {
    this.ec = eventCategory || this.ec;
    return this;
};

Event.prototype.setHitType = function(hitType) {
    this.t = hitType || this.t;
    return this;
};

Event.prototype.toFormUrlEncodedString = function() {
    var string = '';

    for(var key in this) {
        if (this.hasOwnProperty(key)) {
            string += '&' + key + '=' + this[key];
        }
    }
    return string.substring(1);
};

module.exports = Event;