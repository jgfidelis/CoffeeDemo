import { call, put, takeEvery } from 'redux-saga/effects';
import { nearbySuccess, nearbyFailure, NEARBY } from '../reducers/nearby';
import searchVenues from '../../data/venues-search.json';

const fakeFetch = (timeout = 1000) => {
  return new Promise(async resolve => {
    setTimeout(() => resolve(searchVenues.businesses), timeout);
  });
};

const nearbySearchRequest = function* nearbySearchRequest() {
  try {
    const venues = yield call(fakeFetch);
    yield put(nearbySuccess(venues))
  } catch (err) {
    yield put(nearbyFailure('Unexpected error'));
  }
};

const saga = function*() {
  yield takeEvery(NEARBY.SEARCH_START, nearbySearchRequest);
};

export default saga;
