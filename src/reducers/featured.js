import type { Venue } from '../types';

const T = {
  FEATURED_START: 'Nearby/FEATURED_START',
  FEATURED_FAILURE: 'Nearby/FEATURED_FAILURE',
  FEATURED_SUCCESS: 'Nearby/FEATURED_SUCCESS',
}

export const FEATURED = T;

type State = {
  isFetching: boolean,
  error: ?string,
  venue: ?Venue,
};

export const initialState: State = {
  isFetching: false,
  error: null,
  venue: null,
};

export const featuredStart = () => ({
  type: T.FEATURED_START,
});

export const featuredSuccess = (venue: Venue) => ({
  type: T.FEATURED_SUCCESS,
  venue,
});

export const featuredFailure = (error) => ({
  type: T.FEATURED_FAILURE,
  error,
});

export default function featured(state = initialState, action) {
  switch (action.type) {
    case T.FEATURED_START: {
      return {
        ...state,
        isFetching: true,
        error: null,
        venue: null,
      };
    }
    case T.FEATURED_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        venue: action.venue,
        error: null,
      };
    }
    case T.FEATURED_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
        venue: null,
      };
    }

    default:
      return state;
  }
}