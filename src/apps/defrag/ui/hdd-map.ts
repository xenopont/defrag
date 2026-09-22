import { canvas, div } from "../../../shared/x-element/markup.js";
import "./hdd-map.css";
import { defragmentedSegmentImage } from "./segment-images/defragmented.js";
import { fragmentedSegmentImage } from "./segment-images/fragmented.js";
import { freeSegmentImage } from "./segment-images/free.js";
import { readSegmentImage } from "./segment-images/read.js";
import { systemSegmentImage } from "./segment-images/system.js";
import { writeSegmentImage } from "./segment-images/write.js";

const onHddMapInit = (map: HTMLDivElement): void => {
  const width = map.scrollWidth;
  const height = map.scrollHeight;
  const c = canvas({ width: `${width}px`, height: `${height}px` }, []);
  map.appendChild(c);
};

export const hddMap = (): HTMLDivElement => {
  const map = div({ class: "hdd-map", id: "hdd-map" }, []);
  setTimeout(() => onHddMapInit(map), 1);
  return map;
};

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

export const drawSegment = (c: HTMLCanvasElement): void => {
  //
};
