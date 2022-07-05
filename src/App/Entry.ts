/*
    Test 2022

    Authors: Colin Böttger
*/

import { $ } from "../runtime.js";


export abstract class Site {
  remove(): void {
    let p = this.m_parent;
    if (p)
      p.clear();

  }

  render(parent: $.UI.Page): void {
    this.m_parent = parent;
    this.m_render();
  }
  abstract m_render(): void;

  protected m_parent: $.UI.Page;

}

export class Entry extends Site {
  constructor() {
    super();
    this.m_container = new $.UI.CenterFlowContainer();
    let options: $.UI.Entries = {
      "value": { type: "string", label: "Wert" },
      _: { type: "empty" },
      "add": { type: "button", label: "Wert hinzufügen" },
      "remove": { type: "button", label: "Wert löschen" },
    };

    this.m_form = new $.UI.Form(options, "Wert hinzufügen");
    this.m_form.createForm(this.m_container);

  }

  m_render(): void {
    let p = this.m_parent;
    if (!p)
      return;
    this.m_container.parent = p;
    p.headerText = "Dateneingabe";
  }

  private m_container: $.UI.CenterFlowContainer;
  private m_form: $.UI.Form;

}