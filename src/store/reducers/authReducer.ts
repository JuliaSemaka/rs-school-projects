import { CHANGE_VIEW_POPUP, IAuthState, EPageAdmin, CHANGE_ADMIN_PAGE, CHANGE_INDEX_CATEGORY } from "./authReducer.module";
import { IAction } from "./cardReducer.module";

const authState: IAuthState = {
  isViewPopup: false,
  isAdminPage: false,
  pageAdmin: EPageAdmin.ADMIN_PAGE,
  indexCategory: 0,
}

export const authReducer = (state: IAuthState = authState, action: IAction): IAuthState => {
  switch(action.type) {
    case CHANGE_VIEW_POPUP:
      return {...state, isViewPopup: !state.isViewPopup};
    case CHANGE_ADMIN_PAGE:
      return {...state, isAdminPage: !state.isAdminPage};
    case CHANGE_INDEX_CATEGORY:
      return {...state, indexCategory: action.payload};
    default:
      return state;
  }
}
