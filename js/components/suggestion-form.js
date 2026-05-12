/* RedBoi — suggestion form with textarea, dynamic submit button, thank-you state */

import { el, clearChildren } from '../dom.js';
import { FORM_THANK_MS } from '../constants.js';

/**
 * Renders the suggestion form, encapsulating state via closure.
 * @returns {{ element: HTMLElement, dispose: () => void }}
 */
export function renderSuggestionForm() {
  let timer = null;

  const root = el('div', { className: 'suggestion-form' });

  function renderInput() {
    clearChildren(root);

    const textarea = el('textarea', {
      className: 'suggestion-form__textarea',
      rows: '3',
      placeholder: 'Ex: sobremesa, drink especial, prato vegetariano...',
      'aria-label': 'Sua sugestão',
    });

    const submit = el('button', {
      type: 'button',
      className: 'suggestion-form__submit',
    }, 'Escreva sua sugestão...');

    function updateSubmit() {
      const hasText = textarea.value.trim().length > 0;
      submit.classList.toggle('suggestion-form__submit--ready', hasText);
      submit.textContent = hasText ? 'Enviar sugestão 🚀' : 'Escreva sua sugestão...';
    }

    textarea.addEventListener('input', updateSubmit);

    submit.addEventListener('click', () => {
      if (!textarea.value.trim()) return;
      renderThanks();
      timer = setTimeout(() => {
        timer = null;
        renderInput();
      }, FORM_THANK_MS);
    });

    root.appendChild(textarea);
    root.appendChild(submit);
  }

  function renderThanks() {
    clearChildren(root);
    const thanks = el('div', {
      className: 'suggestion-form__thanks is-animated',
      role: 'status',
      'aria-live': 'polite',
    },
      el('div', { className: 'suggestion-form__thanks-emoji', 'aria-hidden': 'true' }, '🙏'),
      el('p', { className: 'suggestion-form__thanks-title' }, 'Obrigado pela sugestão!'),
      el('p', { className: 'suggestion-form__thanks-sub' },
        'Vamos avaliar e quem sabe virar hit da casa!')
    );
    root.appendChild(thanks);
  }

  renderInput();

  return {
    element: root,
    dispose: () => {
      if (timer) clearTimeout(timer);
    },
  };
}
