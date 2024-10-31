export const mapWithCb = (array, callback) => {
  if (!Array.isArray(array) || typeof callback !== 'function') {
    throw Error();
  }
  return array.map(item => callback(item));
};
