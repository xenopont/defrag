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

// set this one for all the colored segments: 8..64
const segmentSize: number = 24;

type TColor = { r: number; g: number; b: number };

const compressColorComponent = (c: number): number => {
  // integer, not greater than 255, not less than 0
  return Math.max(Math.min(Math.floor(c), 255), 0);
};
const compressColor = (color: TColor): TColor => {
  return {
    r: compressColorComponent(color.r),
    g: compressColorComponent(color.g),
    b: compressColorComponent(color.b),
  };
};
const compressSize = (size: number): number => {
  // integer, not greater than 64, not less than 8
  return Math.max(Math.min(Math.floor(size), 64), 8);
};

export const buildImageData = (
  color: TColor,
  border: TColor,
  background: TColor = { r: 255, g: 255, b: 255 },
): Uint8ClampedArray => {
  const s = compressSize(segmentSize);
  const c = compressColor(color);
  const b = compressColor(border);
  const bkgrnd = compressColor(background);

  // 3 color components per pixel
  const rowLength = s * 3;
  const totalLength = rowLength * s;
  const imageData = new Uint8ClampedArray(totalLength);

  // border rows
  const borderLength = rowLength - 6;
  const bottomStart = totalLength - rowLength * 3;
  for (let i = 0; i < borderLength; i = i + 3) {
    // top border
    imageData[i] = b.r;
    imageData[i + 1] = b.g;
    imageData[i + 2] = b.b;
    // bottom border
    imageData[bottomStart + i] = b.r;
    imageData[bottomStart + i + 1] = b.g;
    imageData[bottomStart + i + 2] = b.b;
  }
  // main color
  for (let i = 3; i < )

  return imageData;
};
