/*
    Test 2022

    Authors: Colin Böttger
*/

import { Control } from './control.js';
import { create } from './UI-helper.js';
import { CssClassNames } from './CssClassNames.js';
import { Menu } from './Menu.js';
export class Page
{
  node: HTMLElement;

  constructor(target: HTMLElement)
  {
    this.node = create('main', target);
    this.node.classList.add(CssClassNames.Page.node);

    this.m_header = create('header', this.node);
    this.m_header.classList.add(CssClassNames.Page.header);

    this.m_headerText = create('h1', this.m_header);
    this.m_headerText.classList.add(CssClassNames.Page.headerText);

    this.m_body = create('body', this.node);
    this.m_body.classList.add(CssClassNames.Page.body);

    this.m_footer = create('footer', this.node);
    this.m_footer.classList.add(CssClassNames.Page.footer);
  }

  appendChild(child: Control) { this.m_body.appendChild(child.node); }

  set headerText(value: string) { this.m_headerText.innerHTML = value; }
  get headerText(): string { return this.m_headerText.innerHTML; }
  setHeaderText(value: string) { this.headerText = value; return this; }

  set footerText(value: string) { this.m_footer.innerHTML = value; }
  get footerText(): string { return this.m_footer.innerHTML; }
  setFooterText(value: string) { this.footerText = value; return this; }

  set Menu(value: Menu) { value.parent = this; }

  clear()
  {
    while(this.m_body.lastChild)
      this.m_body.lastChild.remove();
  }

  private m_header: HTMLElement;
  private m_headerText: HTMLElement;
  private m_body: HTMLElement;
  private m_footer: HTMLElement;
}