/*
    Test 2022

    Authors: Colin Böttger
*/

export
{
  Menu,
  MenuCallback,
  MenuPoints
};

import { CssClassNames } from './CssClassNames.js';
import { Page } from './Page.js';
import { create } from './UI-helper.js';

type MenuCallback = () => void;

interface MenuPoints
{
  [key: string]: MenuCallback,
}

class Menu
{
  node: HTMLElement;

  constructor(menuPoint: MenuPoints, parent?: Page)
  {
    this.node = create('nav');
    this.node.classList.add(CssClassNames.Menu.body);

    let list = create('ul', this.node);

    for(let k in menuPoint)
      create('li', list, k).onclick = () => { this.node.classList.add(CssClassNames.Menu.open); menuPoint[k](); };

    for(let k in menuPoint)
    {
      menuPoint[k]();
      break;
    }
    if(parent)
      this.parent = parent;
  }

  set parent(value: Page)
  {
    this.m_parent = value; let targetnode = this.m_parent.node.firstElementChild;
    if(!targetnode)
      return;
    targetnode.appendChild(this.node);
    this.node.classList.add(CssClassNames.Menu.open);
    let btn = create('button', targetnode as HTMLElement, "Menu");
    btn.classList.add(CssClassNames.Menu.button);
    btn.onclick = () => this.node.classList.toggle(CssClassNames.Menu.open);
  }
  get parent(): Page { return this.m_parent; }
  setParent(value: Page) { this.parent = value; return this; }

  private m_parent: Page;
}