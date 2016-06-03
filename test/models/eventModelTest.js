'use strict';
const should = require('should');
const Event = require('../../lib/models/event');

describe('Event model', function() {
    let event;

    beforeEach(function(done) {
        event = new Event();
        done();
    });


    describe('Event Action', function() {
        it('Should not allow non-string values', function(done) {
            event.setAction(1);
            should.not.exist(event.ea);

            event.setAction(null);
            should.not.exist(event.ea);

            event.setAction(undefined);
            should.not.exist(event.ea);

            done();
        });

        it('Should allow string values', function(done) {
            event.setAction('GET');
            event.ea.should.equal('GET');

            done();
        });

    });

    describe('Event Category', function() {

        
    });

    describe('Event Label', function() {

        it('Should not allow non-number values', function(done) {
            event.setLabel('hello');
            should.not.exist(event.el);

            event.setLabel(null);
            should.not.exist(event.el);

            event.setLabel(undefined);
            should.not.exist(event.el);

            done();
        });

        it('Should allow number values', function(done) {
            event.setLabel(200);
            event.el.should.equal(200);

            done();
        });

    });
});