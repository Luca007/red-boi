/* RedBoi — DOM helpers used by every component */

/** Values that should be skipped when applying an attribute. */
const SKIPPED_VALUES = new Set([null, undefined, false]);

/** Applies a single CSS property to an element's inline style. */
function setStyleProp(style, prop, value) {
  if (prop.startsWith('--')) style.setProperty(prop, value);
  else style[prop] = value;
}

/** Applies a style object — supports custom props (`--foo`) via setProperty. */
function applyStyleObject(node, value) {
  for (const prop in value) setStyleProp(node.style, prop, value[prop]);
}

/** Applies a `style` attr that may be a string or an object. */
function applyStyle(node, value) {
  if (typeof value === 'object') applyStyleObject(node, value);
  else node.setAttribute('style', value);
}

/** Copies a dataset object onto `node.dataset`. */
function applyDataset(node, value) {
  for (const key in value) node.dataset[key] = value[key];
}

/** Registers an event handler from an `on<Event>` prop. */
function bindEvent(node, key, handler) {
  node.addEventListener(key.slice(2).toLowerCase(), handler);
}

/** Sets a generic HTML attribute, handling boolean true as empty string. */
function setAttribute(node, key, value) {
  node.setAttribute(key, value === true ? '' : value);
}

/** Lookup table for special-cased attribute keys. */
const ATTR_HANDLERS = {
  className: (node, value) => { node.className = value; },
  style:     applyStyle,
  dataset:   applyDataset,
};

/** Checks whether a prop is an `on<Event>` handler. */
function isEventProp(key, value) {
  return key.startsWith('on') && typeof value === 'function';
}

/** Applies a single (key, value) pair to a DOM node. */
function applyAttr(node, key, value) {
  if (SKIPPED_VALUES.has(value)) return;
  const handler = ATTR_HANDLERS[key];
  if (handler) { handler(node, value); return; }
  if (isEventProp(key, value)) { bindEvent(node, key, value); return; }
  setAttribute(node, key, value);
}

/** Appends one child, dispatching on its runtime shape. */
function appendOne(parent, child) {
  if (SKIPPED_VALUES.has(child)) return;
  if (Array.isArray(child)) appendChildren(parent, child);
  else if (child instanceof Node) parent.appendChild(child);
  else parent.appendChild(document.createTextNode(String(child)));
}

/** Appends an iterable of children (recursive for nested arrays). */
function appendChildren(parent, children) {
  for (const child of children) appendOne(parent, child);
}

/**
 * Creates an HTMLElement with attributes/props and children.
 * Special props:
 *  - className: string
 *  - style: object of CSS properties (custom props starting with `--`
 *    are routed through `style.setProperty`)
 *  - dataset: object of data-* values
 *  - on{Event}: function — registered via addEventListener
 *  - other keys are set as attributes; null/undefined/false are skipped
 * Children may be strings, numbers, Nodes, or arrays of those;
 * null/undefined/false are skipped.
 * @param {string} tag
 * @param {Object} [attrs]
 * @param {...(Node|string|number|null|undefined|false|Array)} children
 * @returns {HTMLElement}
 */
export function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) for (const key in attrs) applyAttr(node, key, attrs[key]);
  appendChildren(node, children);
  return node;
}

/**
 * Removes all children of a DOM node.
 * @param {Node} node
 */
export function clearChildren(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/**
 * addEventListener wrapper that returns a cleanup function.
 * @param {EventTarget} target
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean|AddEventListenerOptions} [options]
 * @returns {() => void}
 */
export function on(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  return () => target.removeEventListener(event, handler, options);
}
