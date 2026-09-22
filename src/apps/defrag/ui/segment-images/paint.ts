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
const NUMS_PER_PIXEL = 3;
const SEGMENT_SPAN = 2;

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
): ImageData => {
  const s = compressSize(segmentSize);
  const c = compressColor(color);
  const b = compressColor(border);
  const bg = compressColor(background);

  const rowLength = s * NUMS_PER_PIXEL;
  const totalLength = rowLength * s;
  const pixelData = new Uint8ClampedArray(totalLength);

  for (let row = 0; row < s; row++) {
    for (let col = 0; col < s * NUMS_PER_PIXEL; col = col + 3) {
      const index = rowLength * row + col;
      // top border & bottom border
      if (row === 0 || row === s - SEGMENT_SPAN - 1) {
        // span
        if (col >= rowLength - SEGMENT_SPAN * NUMS_PER_PIXEL) {
          pixelData[index] = bg.r;
          pixelData[index + 1] = bg.g;
          pixelData[index + 2] = bg.b;
          continue;
        }
        // border otherwise
        pixelData[index] = b.r;
        pixelData[index + 1] = b.g;
        pixelData[index + 2] = b.b;
        continue;
      }
      // bottom span
      if (row >= s - SEGMENT_SPAN) {
        pixelData[index] = bg.r;
        pixelData[index + 1] = bg.g;
        pixelData[index + 2] = bg.b;
        continue;
      }
      // segment's border
      if (col === 0 || col === s - SEGMENT_SPAN - 1) {
        pixelData[index] = b.r;
        pixelData[index + 1] = b.g;
        pixelData[index + 2] = b.b;
        continue;
      }
      // segment itself otherwise
      pixelData[index] = c.r;
      pixelData[index + 1] = c.g;
      pixelData[index + 2] = c.b;
    }
  }

  return new ImageData(new Uint8ClampedArray(pixelData), s, s, {
    colorSpace: "srgb",
  });
};
