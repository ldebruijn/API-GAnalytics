'use strict';

const should = require('should');
const Client = require('../lib/models/client');


describe('Client model', function() {
    let client;

    beforeEach(function(done) {
        client = new Client();
        done();
    });

    describe('Client ID', function() {

        it('Should allow either integer or string values', function(done) {
            let req = {
                user : {
                    id : 1
                }
            };

            client.setClientId(req, ['user', 'id']);
            client.cid.should.equal(1);

            req.user.id = 'pseudo-uuid-1o23qijdfo9920';

            client.setClientId(req, ['user', 'id']);
            client.cid.should.equal('pseudo-uuid-1o23qijdfo9920');

            done();
        });

        it('Should not allow any non-integer or non-string values', function(done) {
            let req = {
                user : {
                    id : {}
                }
            };

            client.setClientId(req, ['user', 'id']);
            should.not.exist(client.cid);

            req.user.id = null;

            client.setClientId(req, ['user', 'id']);
            should.not.exist(client.cid);

            req.user.id = undefined;

            client.setClientId(req, ['user', 'id']);
            should.not.exist(client.cid);

            req.user.id = new Date();

            client.setClientId(req, ['user', 'id']);
            should.not.exist(client.cid);

            done();
        });
    });

    describe('Client IP', function() {

        it('Should not allow non-string values', function(done) {
            client.setIP(1);
            should.not.exist(client.uip);

            client.setIP(null);
            should.not.exist(client.uip);

            client.setIP(undefined);
            should.not.exist(client.uip);

            done();
        });

        it('Should allow string values', function(done) {
            client.setIP('hello');
            client.uip.should.equal('hello');

            client.setIP('127.0.0.1');
            client.uip.should.equal('127.0.0.1');

            done();
        });
    });
});
