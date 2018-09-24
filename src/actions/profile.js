export const OPEN_MODAL_PAGE = "OPEN_MODAL_PAGE";
export const openModalPage = editPage => {
  return {
    type: OPEN_MODAL_PAGE,
    editPage
  };
};

export const CLOSE_MODAL = "CLOSE_MODAL";
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const SUBMIT_PROFILE_FORM = "SUBMIT_PROFILE_FORM";
export const submitProfileForm = (form, values) => {
  return {
    type: SUBMIT_PROFILE_FORM,
    form,
    values
  };
};

export const OPEN_ADD_DISCIPLINE_FORM = "OPEN_ADD_DISCIPLINE_FORM";
export const openAddDisciplineForm = () => {
  return {
    type: OPEN_ADD_DISCIPLINE_FORM
  };
};

export const CLOSE_ADD_DISCIPLINE_FORM = "CLOSE_ADD_DISCIPLINE_FORM";
export const closeAddDisciplineForm = () => {
  return {
    type: CLOSE_ADD_DISCIPLINE_FORM
  };
};

export const TRASH_DISCIPLINE = "TRASH_DISCIPLINE";
export const trashDiscipline = index => {
  return {
    type: TRASH_DISCIPLINE,
    index
  };
};

export const EDIT_DISCIPLINE = "EDIT_DISCIPLINE";
export const editDiscipline = index => {
  return {
    type: EDIT_DISCIPLINE,
    index
  };
};
