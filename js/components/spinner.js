/* RedBoi — loading spinner inserted statically in index.html, hidden after first render */

/**
 * Returns the existing spinner element (placed in HTML before JS loads).
 * @returns {HTMLElement|null}
 */
export function getSpinner() {
  return document.getElementById('spinner');
}

/**
 * Fades out and removes the spinner from the DOM.
 */
export function hideSpinner() {
  const node = getSpinner();
  if (!node) return;
  node.classList.add('spinner--hidden');
  const remove = () => {
    if (node.parentNode) node.parentNode.removeChild(node);
  };
  node.addEventListener('transitionend', remove, { once: true });
  setTimeout(remove, 600);
}
