type TColor = [r: number, g: number, b: number];

/*

We are going to produce the following square image
(■ - border color, □ - main color, ▫ - background):

12x12 example

■■■■■■■■■■▫▫
■□□□□□□□□■▫▫
■□□□□□□□□■▫▫
■□□□□□□□□■▫▫
■□□□□□□□□■▫▫
■□□□□□□□□■▫▫
■□□□□□□□□■▫▫
■□□□□□□□□■▫▫
■□□□□□□□□■▫▫
■■■■■■■■■■▫▫
▫▫▫▫▫▫▫▫▫▫▫▫
▫▫▫▫▫▫▫▫▫▫▫▫

each cell is represented by 3 integers 0..255

*/

const compressColorComponent = (c: number): number => {
  // integer, not greater than 255, not less than 0
  return Math.max(Math.min(Math.floor(c), 255), 0);
};
const compressColor = (color: TColor): TColor => {
  return [
    compressColorComponent(color[0]),
    compressColorComponent(color[1]),
    compressColorComponent(color[2]),
  ];
};
const compressSize = (size: number): number => {
  // integer, not greater than 64, not less than 8
  return Math.max(Math.min(Math.floor(size), 64), 8);
};

export const buildDataArray = (
  size: number,
  color: TColor,
  border: TColor,
  background: TColor = [255, 255, 255],
): Uint8ClampedArray => {
  const s = compressSize(size);
  const c = compressColor(color);
  const b = compressColor(border);
  const bkgrnd = compressColor(background);

  // 3 color components per pixel
  const rowLength = s * 3;
  const totalLength = rowLength * s;
  const result = new Uint8ClampedArray(totalLength);

  // border rows
  const borderLength = rowLength - 2;
  const bottomStart = totalLength - rowLength * 3;
  for (let i = 0; i < borderLength; i = i + 3) {
    // top border
    result[i] = b[0];
    result[i + 1] = b[1];
    result[i + 2] = b[2];
    // bottom border
    result[bottomStart + i] = b[0];
    result[bottomStart + i + 1] = b[1];
    result[bottomStart + i + 2] = b[2];
  }
  //

  return result;
};
