var assert = require('assert');

import sinon from 'sinon';

describe('Promise', function () {

    function promise(onSuccess) {
        return Promise.resolve(42).then(onSuccess)
    }

    let flag = 0

    beforeEach(function () {
        flag = 0
    })

    let callback = sinon.stub()
    it('callback works', function () {
        assert.equal(flag, 0)
        callback()
        assert.equal(flag, 1)
    })

    it('promise works', function () {
        assert.equal(flag, 0)
        promise(callback).then(function () {
            assert.equal(flag, 1)
            done()
        })
    })

});
