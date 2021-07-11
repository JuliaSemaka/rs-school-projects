import { CHANGE_ADMIN_PAGE, CHANGE_INDEX_CATEGORY, CHANGE_VIEW_POPUP, LEAVE_ADMIN_PAGE } from "../reducers/authReducer.module";
import { IAction } from "../reducers/cardReducer.module";

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
