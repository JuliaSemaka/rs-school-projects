import { CHANGE_ADMIN_PAGE, CHANGE_INDEX_CATEGORY, CHANGE_VIEW_POPUP, IS_AUTHORIZE, LEAVE_ADMIN_PAGE } from "../reducers/authReducer.module";
import { IAction, Links } from "../reducers/cardReducer.module";
import {Dispatch} from "redux";

export function changeViewPopup(): IAction {
  return {type: CHANGE_VIEW_POPUP};
}

export function changeAdminPage(): IAction {
  return {type: CHANGE_ADMIN_PAGE};
}

export function leaveAdminPage(): IAction {
  return {type: LEAVE_ADMIN_PAGE};
}

export function changeIndexCategory(index: number): IAction {
  return {type: CHANGE_INDEX_CATEGORY, payload: index};
}

export function setAuthorize(isAdmin: boolean): IAction {
  return {type: IS_AUTHORIZE, payload: isAdmin};
}

export function setFetchAuth(isAdmin: boolean): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(Links.admin, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({isAdmin}),
      });
    } catch (e) {
      throw Error(e);
    }
  }
}
