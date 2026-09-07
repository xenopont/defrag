import { div } from "../../../shared/x-element/markup.js";
import { toolbar } from "./toolbar.js";

export const createMainWindow = (): void => {
  const mainWindowDiv = div({ class: "main-window" }, [toolbar()]);
  document.body.appendChild(mainWindowDiv);
};
