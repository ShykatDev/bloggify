import { actions } from "../actions";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }
    case actions.profile.DATA_FETCHED_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.profile.DATA_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.data,
        },
      };
    }

    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.user.avatar,
        },
      };
    }

    case actions.profile.LOGOUT_DATA: {
      return {
        ...state,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, postReducer };
