import { CHANGE_WALLET } from "../actions/types";

const INITIAL_STATE = { address: 'address' };

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {

    case CHANGE_WALLET:
      return {
        ...state,
        address: action.payload
      }
    default:
      return state
  };
}