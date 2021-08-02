import {
  CHANGE_VIEW_POPUP,
  IAuthState,
  EPageAdmin,
  CHANGE_ADMIN_PAGE,
  CHANGE_INDEX_CATEGORY,
  LEAVE_ADMIN_PAGE,
  IS_AUTHORIZE,
} from './authReducer.module';
import { IAction } from './cardReducer.module';

const authState: IAuthState = {
  isViewPopup: false,
  isAdminPage: false,
  pageAdmin: EPageAdmin.ADMIN_PAGE,
  indexCategory: null,
  isAuthorize: !!sessionStorage.getItem('isAuthAdmin') ?? false,
};

export const authReducer = (
  state: IAuthState = authState,
  action: IAction
): IAuthState => {
  switch (action.type) {
    case CHANGE_VIEW_POPUP:
      return { ...state, isViewPopup: !state.isViewPopup };
    case CHANGE_ADMIN_PAGE:
      return { ...state, isAdminPage: true, pageAdmin: EPageAdmin.ADMIN_PAGE };
    case LEAVE_ADMIN_PAGE:
      return { ...state, isAdminPage: false, pageAdmin: EPageAdmin.ADMIN_PAGE };
    case CHANGE_INDEX_CATEGORY:
      return {
        ...state,
        indexCategory: action.payload,
        pageAdmin: EPageAdmin.ADMIN_WORDS_PAGE,
      };
    case IS_AUTHORIZE:
      return { ...state, isAuthorize: action.payload };
    default:
      return state;
  }
};
