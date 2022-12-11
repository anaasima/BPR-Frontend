module.exports.reshapePixels = (pixels) => {
  const reshaped = [];
  for (let i = 0; i < 512; i++) {
    const row = pixels.slice(i * 512, (i + 1) * 512);
    reshaped.push(mapRow(row));
  }

  const arr = [];
  arr.push(reshaped);
  return arr;
};

const mapRow = (row) => {
  const newRow = [];
  row.forEach((pixel) => {
    const temp = [];
    temp.push(pixel / 2938);
    newRow.push(temp);
  });

  return newRow;
};
