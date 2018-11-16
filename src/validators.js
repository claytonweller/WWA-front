export const required = value => (value ? undefined : "Required");
export const nonEmpty = value => {
  value.trim() !== "" ? undefined : "Cannot be empty";
};

export const isTrimmed = value => {
  value.trim() === value ? undefined : "Cannot start or end with whitespace";
};
export const length = length => value => {
  if (length.min && value.length < length.min) {
    return `Must be at least ${length.min} characters long`;
  }
  if (length.max && value.length > length.max) {
    return `Must be at most ${length.max} characters long`;
  }
};
export const matches = field => (value, allValues) => {
  if (value && allValues[field]) {
    field in allValues && value === allValues[field]
      ? undefined
      : "Does not match";
    console.log(value === allValues[field]);
  }
};

export const notFirstOption = firstOption => selected => {
  if (firstOption === selected) {
    return `You have to pick a value fore this`;
  } else {
    return undefined;
  }
};
