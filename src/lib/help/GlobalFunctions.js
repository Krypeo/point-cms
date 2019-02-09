// TEXT TO LOWERCASE
export const ToLowerCase = (string) => {
  return string.toLowerCase();
};

// ARRAY TO OBJECT
export const arrayToObject = (array, key) => {
  array.reduce((obj, item) => {
    obj[item][key] = item;
    return obj;
  }, {})
}