import "./styles/main.css";
import { createMainWindow } from "./ui/main-window.js";

const main = (): void => {
  createMainWindow();
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});
