import type { Venue } from '../types';

const T = {
  SEARCH_START: 'Nearby/SEARCH_START',
  SEARCH_FAILURE: 'Nearby/SEARCH_FAILURE',
  SEARCH_SUCCESS: 'Nearby/SEARCH_SUCCESS',
}

export const NEARBY = T;

type State = {
  isFetching: boolean,
  error: ?string,
  venues: ?(Venue[]),
};

export const initialState: State = {
  isFetching: false,
  error: null,
  venues: [],
};

export const nearbyStart = () => ({
  type: T.SEARCH_START,
});

export const nearbySuccess = (venues: Venue[]) => ({
  type: T.SEARCH_SUCCESS,
  venues,
});

export const nearbyFailure = (error) => ({
  type: T.SEARCH_FAILURE,
  error,
});

export default function nearby(state = initialState, action) {
  switch (action.type) {
    case T.SEARCH_START: {
      return {
        ...state,
        isFetching: true,
        error: null,
        venues: [],
      };
    }
    case T.SEARCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        venues: action.venues,
        error: null,
      };
    }
    case T.SEARCH_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
        venues: [],
      };
    }

    default:
      return state;
  }
}