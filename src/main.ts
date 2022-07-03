/*
    Test 2022

    Authors: Colin Böttger
*/

import { UI } from './runtime-export.js';
import { $ } from "./runtime.js";
import { Page } from './UserInterface/Page.js';


let saver = new $.SavaManager("./test.json")
let click = 0

let xArray = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

let p = new $.UI.Page(document.body);

let c = new $.UI.CenterFlowContainer(p);
let c3 = new $.UI.CenterFlowContainer(p);
c3.title = "test"

new $.UI.Button(c3).setText("Save").onClick = save
let d = new $.UI.Diagramm.Diagramm(c);

let x = new $.UI.Diagramm.StringAxis(xArray);
let y = new $.UI.Diagramm.NumberAxis(-30, 80, 2);

let f: $.UI.Diagramm.ValueList;
f = [{ x: "Montag", y: 30 }, { x: "Dienstag", y: 60, name: "test" }, { x: "Donnerstag", y: 55 }, { x: "Freitag", y: 60, name: "test2" }];
let f2 = [{ x: "Montag", y: 10 }, { x: "Dienstag", y: 65 }, { x: "Mittwoch", y: 5, name: "Test" }, { x: "Sonntag", y: 23, name: "test2" }];

let graph = new $.UI.Diagramm.PointGraph(f);
graph.name = "Test";
let graph2 = new $.UI.Diagramm.LineGraph(f2);

x.label = "Wochentag";

d.xAxis = x;
d.yAxis = y;
d.addGraph(graph);
d.addGraph(graph2);
d.title = "Luftfeuchte";

p.headerText = "Heading";
p.footerText = "Footer";
new $.UI.Menu({ "Diagramm": Diagramm, "Analog": Analog }, p);

let c2 = new $.UI.CenterFlowContainer();
c2.title = "Echtzeitwerte";
c.title = "An der Eichleite";

let b = new $.UI.AnalogMeter(-30, 60, c2);
b.title = "Temperature";


let t = new $.UI.AnalogMeter(-20, 10);
t.parent = c2;
let i = 0;

t.title = "Luftfeuchte";

window.setInterval(() => {
  b.value = i * -2;
  t.value = i;
  i += 1;
  if (i > 10)
    i = -20;
}, 100);

function save() {
  click += 1
  let payload = { clicks: click }
  saver.saveData(payload)
  console.log(payload)
}

function Diagramm() {
  p.clear();
  c.parent = p;
  c3.parent = p;
  d.plot();
}


function Analog() {
  p.clear();
  c2.parent = p;
  t.update();
  b.update();
}