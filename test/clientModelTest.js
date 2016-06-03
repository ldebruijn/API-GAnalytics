'use strict';

const should = require('should');
const Client = require('../lib/models/client');


describe('Client model', function() {
    let client;

    beforeEach(function(done) {
        client = new Client();
        done();
    });

    it('Client ID should allow either integer or string values', function(done) {
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

    it('Client ID should not allow any non-integer or non-string values', function(done) {
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
