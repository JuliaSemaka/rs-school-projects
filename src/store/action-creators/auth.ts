import { CHANGE_VIEW_POPUP } from "../reducers/authReducer.module";
import { IAction } from "../reducers/cardReducer.module";

export function changeViewPopup(): IAction {
  return {type: CHANGE_VIEW_POPUP};
}
