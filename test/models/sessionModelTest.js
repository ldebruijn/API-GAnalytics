'use strict';

const should = require('should');
const Session = require('../../lib/models/session');


describe('Session model', function() {
    let session;

    beforeEach(function(done) {
        session = new Session();
        done();
    });

    describe('Client ID', function() {

        it('Should allow integer and string values and return a UUID', function(done) {
            let req = {
                user : {
                    id : '1'
                }
            };

            session.setClientId(req, ['user', 'id']);
            session.cid.should.equal('1');

            req.user.id = 1;

            session.setClientId(req, ['user', 'id']);
            session.cid.should.equal(1);

            done();
        });

        it('Should not allow any non-string values', function(done) {
            let req = {
                user : {
                    id : {}
                }
            };

            session.setUserId(req, ['user', 'id']);
            should.not.exist(session.cid);

            req.user.id = null;

            session.setUserId(req, ['user', 'id']);
            should.not.exist(session.cid);

            req.user.id = undefined;

            session.setUserId(req, ['user', 'id']);
            should.not.exist(session.cid);

            req.user.id = new Date();

            session.setUserId(req, ['user', 'id']);
            should.not.exist(session.cid);

            done();
        });

    })

    describe('User ID', function() {

        it('Should allow string values', function(done) {
            let req = {
                user : {
                    id : '1'
                }
            };

            session.setUserId(req, ['user', 'id']);
            session.uid.should.equal('1');

            req.user.id = 1;

            session.setUserId(req, ['user', 'id']);
            session.uid.should.equal(1);

            done();
        });

        it('Should not allow any non-integer or non-string values', function(done) {
            let req = {
                user : {
                    id : {}
                }
            };

            session.setUserId(req, ['user', 'id']);
            should.not.exist(session.cid);

            req.user.id = null;

            session.setUserId(req, ['user', 'id']);
            should.not.exist(session.cid);

            req.user.id = undefined;

            session.setUserId(req, ['user', 'id']);
            should.not.exist(session.cid);

            req.user.id = new Date();

            session.setUserId(req, ['user', 'id']);
            should.not.exist(session.cid);

            done();
        });
    });

    describe('Client IP', function() {

        it('Should not allow non-string values', function(done) {
            session.setIP(1);
            should.not.exist(session.uip);

            session.setIP(null);
            should.not.exist(session.uip);

            session.setIP(undefined);
            should.not.exist(session.uip);

            done();
        });

        it('Should allow string values', function(done) {
            session.setIP('hello');
            session.uip.should.equal('hello');

            session.setIP('127.0.0.1');
            session.uip.should.equal('127.0.0.1');

            done();
        });
    });

    describe('User Agent', function() {

        it('Should not allow non-string values', function(done) {
            session.setUserAgent(1);
            should.not.exist(session.ua);

            session.setUserAgent(null);
            should.not.exist(session.ua);

            session.setUserAgent(undefined);
            should.not.exist(session.ua);

            done();
        });

        it('Should allow string values', function(done) {
            let userAgent = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14';

            session.setUserAgent(userAgent);
            session.ua.should.equal(userAgent);

            done();
        });
    });

    describe('User Language', function() {

        it('Should not allow non-string values', function(done) {
            session.setUserLanguage(1);
            should.not.exist(session.ul);

            session.setUserLanguage(null);
            should.not.exist(session.ul);

            session.setUserLanguage(undefined);
            should.not.exist(session.ul);

            done();
        });

        it('Should allow string values', function(done) {
            let req = {
                user : {
                    locale : 'en_GB'
                }
            };
            session.setUserLanguage(req, ['user', 'locale']);
            session.ul.should.equal('en_GB');

            done();
        });
    });

    describe('Constructor', function() {
        let req = {
            user : {
                id : '1',
                locale : 'en_GB'
            },
            headers : {
                'user-agent' : 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14'
            },
            ip : '127.0.0.1'
        };

        let options = {
            userId : ['user', 'id'],
            locale : ['user', 'locale']
        };

        it('Should correctly set all properties from the constructor', function(done) {
            session = new Session(req, options);

            session.uid.should.equal('1');
            session.uip.should.equal('127.0.0.1');
            session.ul.should.equal('en_GB');
            session.ua.should.equal('Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14');

            done();
        });
    });
});
