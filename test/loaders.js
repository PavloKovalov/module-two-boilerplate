/* eslint-disable */

import { assert } from 'chai';

import mockery from 'mockery';

import sinon from 'sinon';

describe.only('loaders', function () {
  const fakeData = [1,2,3,4];
  const fakeDataAccessor = sinon.stub();
  const username = 'john';

  const renderSearchResult = sinon.stub();
  const showError = sinon.stub();

  let loadUsers;

  before(function() {
    mockery.enable({
      warnOnUnregistered: false,
      useCleanCache: true
    });

    let module = {
      renderSearchResult,
      showError
    };

    const magic = new Proxy({}, {
      get: function(target, prop, receiver) {
        if (prop === 'default') {
          return magic;
        }
        return sinon.stub();
      }
    });

    mockery.registerMock('./renderers', magic);

    loadUsers = require('../src/js/loaders').loadUsers;

    document.body.innerHTML = `<input id="username" type="text" value="${username}" />`;
  })

  beforeEach(function () {
    sinon.stub(window, 'fetch');

  });

  afterEach(function () {
    window.fetch.restore();
  })

  it('should call fetch and render results', function (done) {
    window.fetch.returns(
      Promise.resolve({
        json() {
          return {
            status: 'ok',
            get data() {
              fakeDataAccessor();
              return fakeData;
            }
          }
        }
      })
    )

    loadUsers()
      .then(function() {
        // assert.isTrue(renderSearchResult.called)
        assert.isTrue(fakeDataAccessor.called)
        // assert.equal(renderSearchResult.firstCall.args[0], fakeData)
        done();
      })
      .catch(done)

    assert.isTrue(window.fetch.called);

    const [ url ] = window.fetch.firstCall.args;
    assert.equal(url, `http://188.166.73.133/wg-api/wot/account/list/?search=${username}`)
  })

  it('should render error on fail', function (done) {
    window.fetch.returns(
      Promise.reject({status: 400})
    )

    loadUsers()
      .then(function() {
        assert.isTrue(showError.called)
        done()
      })
  })

});
