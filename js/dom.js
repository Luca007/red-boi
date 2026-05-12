/* RedBoi — DOM helpers used by every component */

/**
 * Creates an HTMLElement with attributes/props and children.
 * Special props:
 *  - className: string
 *  - style: object of CSS properties (camelCase keys for inline overrides; kebab-case via `setProperty` for custom props starting with --)
 *  - on{Event}: function — registered via addEventListener (event name lowercased)
 *  - dataset: object of data-* values
 *  - other keys are set as attributes (skip null/undefined/false)
 * Children may be strings, numbers, Nodes, or arrays of those; null/undefined/false are skipped.
 * @param {string} tag
 * @param {Object} [attrs]
 * @param {...(Node|string|number|null|undefined|false|Array)} children
 * @returns {HTMLElement}
 */
export function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const key in attrs) {
      const value = attrs[key];
      if (value === null || value === undefined || value === false) continue;
      if (key === 'className') {
        node.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        for (const prop in value) {
          if (prop.startsWith('--')) node.style.setProperty(prop, value[prop]);
          else node.style[prop] = value[prop];
        }
      } else if (key === 'dataset' && typeof value === 'object') {
        for (const d in value) node.dataset[d] = value[d];
      } else if (key.startsWith('on') && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        node.setAttribute(key, value === true ? '' : value);
      }
    }
  }
  appendChildren(node, children);
  return node;
}

function appendChildren(parent, children) {
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    if (Array.isArray(child)) {
      appendChildren(parent, child);
    } else if (child instanceof Node) {
      parent.appendChild(child);
    } else {
      parent.appendChild(document.createTextNode(String(child)));
    }
  }
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
