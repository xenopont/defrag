import { canvas, div } from "../../../shared/x-element/markup.js";
import "./hdd-map.css";

const SEGMENT_SIZE_PX = 8;

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

type TSegmentImageMap = {
  [k in TSegmentType]: ImageData;
};

const segmentImageMap: TSegmentType = {
  //
};

export const drawSegment = (c: HTMLCanvasElement): void => {
  //
};
