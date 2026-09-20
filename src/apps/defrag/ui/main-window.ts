import { div } from "../../../shared/x-element/markup.js";
import { hddMap } from "./hdd-map.js";
import { toolbar } from "./toolbar.js";
import "./main-window.css";

export const createMainWindow = (): void => {
  const mainWindowDiv = div({ class: "main-window" }, [toolbar(), hddMap()]);
  document.body.appendChild(mainWindowDiv);
};
