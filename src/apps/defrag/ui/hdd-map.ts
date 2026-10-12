import { canvas, div } from "../../../shared/x-element/markup.js";
import "./hdd-map.css";
import { defragmentedSegmentImage } from "./segment-images/defragmented.js";
import { fragmentedSegmentImage } from "./segment-images/fragmented.js";
import { freeSegmentImage } from "./segment-images/free.js";
import { segmentSize } from "./segment-images/paint.js";
import { readSegmentImage } from "./segment-images/read.js";
import { systemSegmentImage } from "./segment-images/system.js";
import { writeSegmentImage } from "./segment-images/write.js";

enum TSegmentType {
  FREE,
  FRAGMENTED,
  DEFRAGMENTED,
  SYSTEM,
  READ,
  WRITE,
}

type TSegmentImageDictionary = {
  [k in TSegmentType]: ImageData;
};

const segmentImageDictionary: TSegmentImageDictionary = {
  [TSegmentType.FREE]: freeSegmentImage,
  [TSegmentType.FRAGMENTED]: fragmentedSegmentImage,
  [TSegmentType.DEFRAGMENTED]: defragmentedSegmentImage,
  [TSegmentType.SYSTEM]: systemSegmentImage,
  [TSegmentType.READ]: readSegmentImage,
  [TSegmentType.WRITE]: writeSegmentImage,
};

export const drawSegment = (
  ctx: CanvasRenderingContext2D,
  type: TSegmentType,
  x: number,
  y: number,
): void => {
  ctx.putImageData(segmentImageDictionary[type], x, y);
};

const getRandomType = (): TSegmentType => {
  const rnd = Math.random();
  if (rnd > 0.99) {
    return TSegmentType.READ;
  }
  if (rnd > 0.98) {
    return TSegmentType.WRITE;
  }
  if (rnd > 0.88) {
    return TSegmentType.SYSTEM;
  }
  if (rnd > 0.72) {
    return TSegmentType.FRAGMENTED;
  }
  if (rnd > 0.25) {
    return TSegmentType.DEFRAGMENTED;
  }

  return TSegmentType.FREE;
};

const drawRandomSegments = (c: HTMLCanvasElement): void => {
  const width = Math.floor(c.width / segmentSize) - 1;
  const height = Math.floor(c.height / segmentSize) - 1;
  const borderWidth = Math.floor((c.width - width * segmentSize) / 2) + 1;
  const borderHeight = Math.floor((c.height - height * segmentSize) / 2) + 1;
  const ctx = c.getContext("2d");
  if (!ctx) {
    throw new Error("Can't get Canvas context");
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const type = getRandomType();
      drawSegment(
        ctx,
        type,
        x * segmentSize + borderWidth,
        y * segmentSize + borderHeight,
      );
    }
  }
};

const onHddMapInit = (map: HTMLDivElement): void => {
  const width = map.scrollWidth;
  const height = map.scrollHeight;
  const c = canvas({ width: `${width}px`, height: `${height}px` }, []);
  map.appendChild(c);
  drawRandomSegments(c);
};

export const hddMap = (): HTMLDivElement => {
  const map = div({ class: "hdd-map", id: "hdd-map" }, []);
  // timeout is required to let the elements get their dimensions
  setTimeout(() => onHddMapInit(map), 1);
  return map;
};
