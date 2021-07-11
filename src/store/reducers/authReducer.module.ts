export const CHANGE_VIEW_POPUP = 'CHANGE_VIEW_POPUP';
export const CHANGE_ADMIN_PAGE = 'CHANGE_ADMIN_PAGE';
export const CHANGE_INDEX_CATEGORY = 'CHANGE_INDEX_CATEGORY';

export interface IAuthState {
  isViewPopup: boolean;
  isAdminPage: boolean;
  pageAdmin: EPageAdmin;
  indexCategory: number;
}

export enum EPageAdmin {
  ADMIN_PAGE = 'ADMIN_PAGE',
  ADMIN_WORDS_PAGE = 'ADMIN_WORDS_PAGE',
}
