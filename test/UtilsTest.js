'use strict';

const Utils = require('../lib/utils');

describe('Utils test', function () {

    it('TraverseObject should end up at the right destination', function(done) {
        let req = {
           user : {
               id : 1
           },
           headers : {}
        };

        let result = Utils.traverseObjectByArray(req, ['user', 'id']);
        result.should.equal(1);

        done();
    });
});
