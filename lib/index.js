import App from './App.svelte';

if (!window) {
  throw new Error('Firstclasspostcodes postcode plugin required outside of browser');
}

window.FirstclasspostcodesPlugin = (target, props = {}) => {
  let $target = target;
  if (typeof target === 'string') {
    $target = document.getElementById(target);
  }
  return new App({ target: $target, props });
};
