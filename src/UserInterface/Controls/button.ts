/****************************************************
*
*   Copyright 2022 
*
*   Authors: Colin Böttger
*
*   boettger.colin@web.de
*
*****************************************************/

import { isConstructorDeclaration } from "../../../node_modules/typescript/lib/typescript.js";
import { Container } from "../container.js";
import { Control } from "../control.js";
import { Page } from "../Page.js";
import { create } from "../UI-helper.js";

enum CssClassnames {

}

interface ButtonOptions {
  target?: HTMLElement,
  text?: string,
  isEnabled?: boolean,
}

export class Button extends Control {
  node: HTMLButtonElement
  private m_parent: Page | Container
  constructor(parent: Container | Page, text?: string) {
    super()
    this.node = create('button');
    this.parent = parent
    if (text)
      this.text = text
  }

  set parent(value: Container | Page) {
    this.m_parent = value
    value.appendChild(this)
  }

  set onClick(value: (event: MouseEvent) => void) { this.node.onclick = value }
  setOnClick(value: (event: MouseEvent) => void): Button { this.onClick = value; return this; }

  set enabled(value: boolean) { this.node.disabled = !value }
  get enabled(): boolean { return !this.node.disabled }
  setEnabled(value: boolean): Button { this.enabled = value; return this }

  set text(value: string) { this.node.innerHTML = value }
  get text(): string { return this.node.innerHTML }
  setText(value: string): Button { this.text = value; return this }
}
