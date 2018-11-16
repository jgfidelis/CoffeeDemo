import { call, put, takeEvery } from 'redux-saga/effects';
import featured from '../../data/venue.json';
import { featuredSuccess, featuredFailure, FEATURED } from '../reducers/featured';

const fakeFetch = (timeout = 1000) => {
  return new Promise(async resolve => {
    setTimeout(() => resolve(featured), timeout);
  });
};

const featuredRequest = function* featuredRequest() {
  try {
    const venues = yield call(fakeFetch);
    yield put(featuredSuccess(venues))
  } catch (err) {
    yield put(featuredFailure('Unexpected error'));
  }
};

const saga = function*() {
  yield takeEvery(FEATURED.FEATURED_START, featuredRequest);
};

export default saga;
