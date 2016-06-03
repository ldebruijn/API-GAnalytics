'use strict';
const General = require('../../lib/models/general');
const should = require('should');

describe('General model', function() {
    let general;

    beforeEach(function(done) {
        general = new General();
        done();
    });

    it('Should only allow a string for the trackingId', function(done) {
        general.setTrackingId(1);
        should.not.exist(general.tid);

        general.setTrackingId(null);
        should.not.exist(general.tid);

        general.setTrackingId(undefined);
        should.not.exist(general.tid);

        general.setTrackingId('GA-XXXXX-Y');
        general.tid.should.equal('GA-XXXXX-Y');

        done();
    });
});
