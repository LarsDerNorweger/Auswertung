/*
    Test 2022

    Authors: Colin Böttger
*/

export {
  create,
  clearElem,
  sleep
};

function create<K extends keyof HTMLElementTagNameMap>(tagName: K, target?: HTMLElement, innerText?: string): HTMLElementTagNameMap[K] {
  let elem = document.createElement(tagName);
  if (target)
    target.appendChild(elem);

  if (innerText)
    elem.innerHTML = innerText;

  return elem;
}

function clearElem(target: Node) {
  while (target.hasChildNodes)
    target.lastChild?.remove();
}

function sleep(milliseconds: number): Promise<void> { return new Promise((res, rej) => window.setTimeout(() => res(), milliseconds)) }