import { all, fork } from 'redux-saga/effects';

import nearby from './nearby';
import featured from './featured';

const sagas = [fork(nearby), fork(featured)];

const root = function* root(): any {
  yield all(sagas);
};

export default root;