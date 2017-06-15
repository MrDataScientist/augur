import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { transferFunds, __RewireAPI__ as transferFundsReqireAPI } from 'modules/auth/actions/transfer-funds';

import { ETH_TOKEN, ETH, REP } from 'modules/account/constants/asset-types';

describe('modules/auth/actions/transfer-funds.js', () => {
  const mockStore = configureMockStore([thunk]);
  const test = t => it(t.description, (done) => {
    const store = mockStore(t.state || {});
    t.assertions(done, store);
  });

  afterEach(() => {
    transferFundsReqireAPI.__ResetDependency__('augur');
    transferFundsReqireAPI.__ResetDependency__('updateAssets');
  });

  test({
    description: `should return the expected console error from the default switch`,
    state: {
      loginAccount: {
        address: '0xtest'
      }
    },
    assertions: (done, store) => {
      const origConErr = console.error;

      console.error = sinon.stub();

      store.dispatch(transferFunds(10, 'to-default', '0xtest2'));

      assert(console.error.calledOnce, `didn't call 'console.error' once as expected`);

      console.error = origConErr;
      done();
    }
  });

  test({
    description: `should call the 'Cash.send' method of augur when currency is ETH_TOKEN`,
    state: {
      loginAccount: {
        address: '0xtest'
      }
    },
    assertions: (done, store) => {
      const Cash = {
        send: sinon.stub()
      };

      transferFundsReqireAPI.__Rewire__('augur', {
        api: {
          Cash
        }
      });

      store.dispatch(transferFunds(10, ETH_TOKEN, '0xtest2'));

      assert(Cash.send.calledOnce, `didn't call 'Cash.send' once as expected`);

      done();
    }
  });

  test({
    description: `should call the 'sendEther' method of augur when currency is ETH`,
    state: {
      loginAccount: {
        address: '0xtest'
      }
    },
    assertions: (done, store) => {
      const sendEther = sinon.stub();

      transferFundsReqireAPI.__Rewire__('augur', {
        api: {
          sendEther
        }
      });

      store.dispatch(transferFunds(10, ETH, '0xtest2'));

      assert(sendEther.calledOnce, `didn't call 'Cash.send' once as expected`);

      done();
    }
  });

  test({
    description: `should call the 'REP' method of augur when currency is REP`,
    state: {
      loginAccount: {
        address: '0xtest'
      },
      branch: {
        id: '0xbranch'
      }
    },
    assertions: (done, store) => {
      const sendReputation = sinon.stub();

      transferFundsReqireAPI.__Rewire__('augur', {
        api: {
          sendReputation
        }
      });

      store.dispatch(transferFunds(10, REP, '0xtest2'));

      assert(sendReputation.calledOnce, `didn't call 'Cash.send' once as expected`);

      done();
    }
  });

  test({
    description: `should dispatch the 'updateAssets' method from the 'onSuccess' callback`,
    state: {
      loginAccount: {
        address: '0xtest'
      }
    },
    assertions: (done, store) => {
      const Cash = {
        send: (options) => {
          options.onSuccess();
        }
      };

      const updateAssets = sinon.stub().returns({
        type: 'updateAssets'
      });

      transferFundsReqireAPI.__Rewire__('augur', {
        api: {
          Cash
        }
      });
      transferFundsReqireAPI.__Rewire__('updateAssets', updateAssets);

      store.dispatch(transferFunds(10, ETH_TOKEN, '0xtest2'));

      assert(updateAssets.calledOnce, `didn't call 'updateAssets' once as expected`);

      done();
    }
  });
});
