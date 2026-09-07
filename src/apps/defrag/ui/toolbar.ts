import { button, div } from "../../../shared/x-element/markup.js";
import "./toolbar.css";

export const toolbar = (): HTMLDivElement => {
  return div({ class: "toolbar" }, [
    button({ disabled: "disabled" }, ["Button 1"]),
    button({}, ["Button 2"]),
  ]);
};
