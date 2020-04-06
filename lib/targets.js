export const getTarget = (target) => {
  if (!target) {
    return null;
  }
  if (typeof target === 'string') {
    return document.querySelector(target);
  }
  return target;
};

export const assignValueToTarget = (target, value) => {
  const element = getTarget(target);
  if (!element) {
    // eslint-disable-next-line no-console
    return console.warn(`Error assigning value "${value}" to "${target}" (target not found)`);
  }
  element.value = value;
};