// 2. Mocking functions: mapWithCb
// The mapwithCb function accepts an array and a callback. It maps over the array with
// the callback, so we can expect the callback function to be called multiple times.


function mapWithCb(array, callback) {
    return array.map(callback);
}

module.exports = mapWithCb;
