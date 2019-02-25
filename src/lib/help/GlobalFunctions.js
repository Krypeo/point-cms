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
};

// RANDOM COLOR GENERATOR;'
export const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};