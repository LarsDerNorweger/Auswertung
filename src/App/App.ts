/*
    Test 2022

    Authors: Colin Böttger
*/

import { ClassDeclaration, ClassElement } from "../../node_modules/typescript/lib/typescript.js";
import { UI } from "../runtime-export.js";
import { Site, Entry } from "./Entry.js";
import { Settings } from "./Settings.js";
import { $ } from "../runtime.js";

export { createWebsite }



function createWebsite() {
  let mainPage = new $.UI.Page(document.body)

  let menuItems: $.UI.MenuPoints = {
    "Dateneingabe": () => renderSite(new Entry(), mainPage),
    "Auswertung": () => { },
    "Einstellung": () => renderSite(new Settings(), mainPage),
  }

  let Menu = new $.UI.Menu(menuItems, mainPage)
}
function renderSite(newSite: Site, mainPage: $.UI.Page) {
  if (actSite)
    actSite.remove()
  mainPage.headerText = ""
  actSite = newSite
  actSite.render(mainPage)

}

let actSite: Site | undefined = undefined
