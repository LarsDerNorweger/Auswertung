/*
    Test 2022

    Authors: Colin Böttger
*/

export
{
  create,
  clearElem,
};

function create<K extends keyof HTMLElementTagNameMap>(tagName: K, target?: HTMLElement, innerText?: string): HTMLElementTagNameMap[K]
{
  let elem = document.createElement(tagName);
  if(target)
    target.appendChild(elem);

  if(innerText)
    elem.innerHTML = innerText;

  return elem;
}

function clearElem(target: Node)
{
  while(target.hasChildNodes)
    target.lastChild?.remove();
}
