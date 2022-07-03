/*
    Test 2022

    Authors: Colin Böttger
*/

import { Control } from './control.js';
import { Page } from './Page.js';

export abstract class Container
{
  abstract node: HTMLElement;
  protected abstract content: HTMLElement;
  protected abstract heading: HTMLHeadingElement;

  set parent(value: Page)
  {
    if(this.m_parent != value)
      value.appendChild(this);
  }

  set title(value: string) { this.heading.innerHTML = value; }
  get title(): string { return this.heading.innerHTML; }
  setTitle(value: string) { this.title = value; return this; }

  appendChild(value: Control) { this.content.appendChild(value.node); }
  get classList(): DOMTokenList { return this.node.classList; }
  remove() { this.node.remove(); }
  private m_parent: Page;
}