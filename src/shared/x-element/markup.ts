import type { Attributes, ChildElement } from "./x-element.js";
import { xElement } from "./x-element.js";

export const button = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLButtonElement => {
  return xElement("button", attributes, children) as HTMLButtonElement;
};

export const div = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLDivElement => {
  return xElement("div", attributes, children) as HTMLDivElement;
};

export const p = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLParagraphElement => {
  return xElement("p", attributes, children) as HTMLParagraphElement;
};

export const h1 = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLHeadingElement => {
  return xElement("h1", attributes, children) as HTMLHeadingElement;
};

export const h2 = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLHeadingElement => {
  return xElement("h2", attributes, children) as HTMLHeadingElement;
};

export const h3 = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLHeadingElement => {
  return xElement("h3", attributes, children) as HTMLHeadingElement;
};

export const h4 = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLHeadingElement => {
  return xElement("h4", attributes, children) as HTMLHeadingElement;
};

export const h5 = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLHeadingElement => {
  return xElement("h5", attributes, children) as HTMLHeadingElement;
};

export const h6 = (
  attributes: Attributes,
  children: ChildElement[],
): HTMLHeadingElement => {
  return xElement("h6", attributes, children) as HTMLHeadingElement;
};
