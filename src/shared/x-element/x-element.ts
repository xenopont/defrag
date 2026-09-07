type StyleKey = keyof CSSStyleDeclaration;
type StyleValue = string | number;
type StyleObject = Partial<Record<StyleKey, StyleValue>>;

export type Attributes = { [attributeName: string]: string | StyleObject };
export type ChildElement = HTMLElement | string;

const attachChildren = (
  element: HTMLElement,
  children: ChildElement[],
): void => {
  for (const child of children) {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }
};

const applyStyle = (
  element: HTMLElement,
  style: StyleObject | string,
): void => {
  if (typeof style === "string") {
    element.style.cssText = style;

    return;
  }
  for (const property in style) {
    if (!Object.hasOwn(style, property)) {
      continue;
    }
    element.style.setProperty(property, style[property]?.toString() ?? null);
  }
};

const applyAttributes = (
  element: HTMLElement,
  attributes: Attributes,
): void => {
  for (const key in attributes) {
    if (!Object.hasOwn(attributes, key)) {
      continue;
    }

    if (key === "style" && attributes[key] !== undefined) {
      applyStyle(element, attributes[key]);
      continue;
    }

    if (attributes[key] === undefined || attributes[key] === null) {
      element.removeAttribute(key);
      continue;
    }

    element.setAttribute(key, String(attributes[key]));
  }
};

export const xElement = (
  tagName: string,
  attributes: Attributes = {},
  children: ChildElement[] = [],
): HTMLElement => {
  const element = document.createElement(tagName);
  applyAttributes(element, attributes);
  attachChildren(element, children);

  return element;
};
