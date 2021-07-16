export const CHANGE_VIEW_POPUP = 'CHANGE_VIEW_POPUP';
export const CHANGE_ADMIN_PAGE = 'CHANGE_ADMIN_PAGE';
export const CHANGE_INDEX_CATEGORY = 'CHANGE_INDEX_CATEGORY';
export const LEAVE_ADMIN_PAGE = 'LEAVE_ADMIN_PAGE';
export const IS_AUTHORIZE = 'IS_AUTHORIZE';

export interface IAuthState {
  isViewPopup: boolean;
  isAdminPage: boolean;
  pageAdmin: EPageAdmin;
  indexCategory: number | null;
  isAuthorize: boolean;
}

export enum EPageAdmin {
  ADMIN_PAGE = 'ADMIN_PAGE',
  ADMIN_WORDS_PAGE = 'ADMIN_WORDS_PAGE',
}
