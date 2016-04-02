'use strict';
var utils = require('./utils');

var Event = function() {
    this.t = 'event';
};

Event.prototype.setEventAction = function(eventAction) {
    this.ea = eventAction || this.ea;
    return this;
};

Event.prototype.setEventLabel = function(eventLabel) {
    if (eventLabel == null) {
        return this;
    }

    this.el = eventLabel || this.el;
    return this;
};

Event.prototype.setEventCategory = function(eventCategory) {
    this.ec = eventCategory || this.ec;
    return this;
};

Event.prototype.toFormUrlEncodedString = function() {
    return utils.objectToFormUrlEncodedString(this);
};

module.exports = Event;