/*
    Test 2022

    Authors: Colin Böttger
*/

import { UI } from "../runtime-export.js";
import { $ } from "../runtime.js";
import { Site } from "./Entry.js";
export class Settings extends Site {
  constructor() {
    super()
    this.m_container = new $.UI.CenterFlowContainer()
    let options: $.UI.Entries = {
      "start": { type: "string", label: "Startjahr" }
    }

    this.m_form = new $.UI.Form(options, "Auswertung")
    this.m_form.createForm(this.m_container)

  }

  m_render(): void {
    let p = this.m_parent
    if (!p)
      return
    this.m_container.parent = p
    p.headerText = "Einstellungen"
  }

  private m_container: $.UI.CenterFlowContainer
  private m_form: $.UI.Form

}