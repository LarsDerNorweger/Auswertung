/****************************************************
*
*   Copyright 2022 
*
*   Authors: Colin Böttger
*
*   boettger.colin@web.de
*
*****************************************************/


import { Container } from "../container.js";
import { Control } from "../control.js";
import { Page } from "../Page.js";
import { create } from "../UI-helper.js";

type Elements = 'checkbox' | 'listbox' | 'empty' | 'textarea' | 'number' | 'date' | 'button' | 'string';

interface Options {
  type: Elements;
  label?: string,
  onlclick?: () => void,
  disabled?: boolean,
  text?: string | string[],
  writeable?: boolean,
  min?: number,
  max?: number,
}



export type Entries = { [name: string]: Options; };
type Preset = { [name: string]: number | Date | boolean | string; };


export class Form extends Control {
  node: HTMLDivElement;

  private Inputs = new Map<string, HTMLDivElement>();

  constructor(entries: Entries, label: string) {
    super()
    this.node = create('div');
    this.node.classList.add('DataForm');

    this.heading = create('h1', this.node, label);
    this.content = create('main', this.node)

    Object.keys(entries).forEach(
      entry => {
        this.Inputs.set(entry, this._BuildContent(entries[entry]))
      }
    );
  }

  set parent(value: Container | Page) {
    value.appendChild(this)
  }

  getValues(callback: (key: string, value: string | boolean) => void) {
    this.Inputs.forEach((e, key) => {
      let child: ChildNode | null = null;
      if (e) {
        child = e.lastChild;
      }

      if (child instanceof HTMLInputElement)
        callback(key, child.checked ? child.checked : child.value);

      if (child instanceof HTMLTextAreaElement)
        callback(key, child.value);

    });
  }

  setData(key: string, value?: string | boolean) {
    let t = this.Inputs.get(key);
    let child: ChildNode | null = null;

    if (t)
      child = t.lastChild;
    if (child instanceof HTMLInputElement) {
      if (typeof value == 'boolean')
        child.checked = value;
      if (typeof value == 'string')
        child.value = value;
    }
    if (child instanceof HTMLTextAreaElement) {
      if (typeof value == 'string')
        child.value = value;
    }
  }

  createForm(target: Container | Page): Form {
    this.parent = target
    return this
  }

  private _BuildContent(op: Options) {
    let inDiv = create('div', this.content);

    switch (op.type) {
      case 'number':
        if (op.label)
          create('p', inDiv, op.label);
        let n = create('input', inDiv);
        n.type = op.type;
        if (op.min)
          n.min = op.min.toString();
        if (op.max)
          n.max = op.max.toString();
        return inDiv;

      case 'date':
        if (op.label)
          create('p', inDiv, op.label);
        let d = create('input', inDiv);
        d.type = op.type;
        return inDiv;
      case 'button':
        let b = create('button', inDiv, op.label);
        if (op.onlclick)
          b.onclick = () => op.onlclick!();
        return inDiv;
      case 'checkbox':
        let id = uuid();
        let l = create('label', inDiv, op.label);
        l.setAttribute('for', id);
        let c = create('input', inDiv);
        c.type = op.type;
        c.id = id;
        if (op.onlclick)
          c.onclick = () => op.onlclick!();
        return inDiv;

      case 'string':
        if (op.label)
          create('p', inDiv, op.label);
        let i = create('input', inDiv);
        if (op.writeable !== undefined)
          i.disabled = !op.writeable;
        return inDiv;
      case 'textarea':
        let idT = uuid();
        let lT = create('label', inDiv, op.label);
        lT.setAttribute('for', idT);
        let T = create('textarea', inDiv);
        T.id = idT;
        T.spellcheck = true;
        T.rows = 4;
        T.cols = 20;
        return inDiv;
      case 'listbox':
        let lB = create('label', inDiv, op.label)
        let B = create('select', inDiv);
        if (!Array.isArray(op.text))
          throw new TypeError()
        for (let i of op.text)
          create('option', B, i)
        return inDiv


    }
    return inDiv;

  }
  private heading: HTMLHeadingElement
  private content: HTMLElement
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}