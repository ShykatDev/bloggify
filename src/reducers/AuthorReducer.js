import { actions } from "../actions";

const initialState = {
  loading: false,
  author: null,
  error: null,
};

const authorReducer = (state, action) => {
  switch (action.type) {
    case actions.author.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.author.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        author: action.data,
      };
    }
    case actions.author.DATA_FETCHED_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
  }
};

export { initialState, authorReducer };
