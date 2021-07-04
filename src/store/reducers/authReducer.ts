import { CHANGE_VIEW_POPUP, IAuthState } from "./authReducer.module";
import { IAction } from "./cardReducer.module";

const authState: IAuthState = {
  isViewPopup: false,
}

export const authReducer = (state: IAuthState = authState, action: IAction): IAuthState => {
  switch(action.type) {
    case CHANGE_VIEW_POPUP:
      return {...state, isViewPopup: !state.isViewPopup};
    default:
      return state;
  }
}
