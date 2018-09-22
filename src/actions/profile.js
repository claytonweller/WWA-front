export const OPEN_MODAL_PAGE = "OPEN_MODAL_PAGE";
export const openModalPage = editPage => {
  return {
    type: OPEN_MODAL_PAGE,
    editPage
  };
};

export const SUBMIT_BASIC_INFO = "SUBMIT_BASIC_INFO";
export const submitBasicInfo = values => {
  return {
    type: SUBMIT_BASIC_INFO,
    values
  };
};

export const SUBMIT_DISCIPLINES = "SUBMIT_DISCIPLINES";
export const submitBasicInfo = values => {
  return {
    type: SUBMIT_DISCIPLINES,
    values
  };
};