/*
    Test 2022

    Authors: Colin Böttger
*/

import { DataGraphBase } from './Graphs/DataGraphBase.js';
import { AxisBase, AxisType } from './Axis/AxisBase.js';
import { CssClassnames } from './Diagramm-CssClassnames.js';
import { $ } from '../../../runtime.js';
import { Control } from '../../control.js';
import { Container } from '../../container.js';
import { create } from '../../UI-helper.js';
const Defines = {
  offSetBorders: 5, // percent
};

export type color = { red: number, green: number, blue: number; };

export interface DiagrammProperties
{
  height: number,
  width: number,
  node: $.SVG.Svg,
  legend: HTMLDivElement,
  nextGraph: number,
  nextColor: color,
  zeroX: number,
  zeroY: number,
  XAxis?: AxisBase,
  YAxis?: AxisBase,
}

export class Diagramm extends Control
{
  node: HTMLElement;

  constructor(parent?: Container)
  {
    super();
    this.node = create('div');
    this.node.classList.add(CssClassnames.DiagrammContainer);

    this.m_Heading = create('h1', this.node);
    this.m_Heading.classList.add(CssClassnames.DiagrammHeading);

    let svg = new $.SVG.Svg(this.node);
    svg.classList.add(CssClassnames.DiagrammBody);
    svg.node.getBBox(); // important for svg.node.height.baseVal.value

    this.m_Legend = create('div', this.node);
    this.m_Legend.classList.add(CssClassnames.DiagrammLegend);

    this.m_DiagrammProperties = {
      height: svg.node.height.baseVal.value * (100 - Defines.offSetBorders) / 100,
      width: svg.node.width.baseVal.value * (100 - Defines.offSetBorders) / 100,
      node: svg,
      nextColor: { red: 0, green: 0, blue: 0 },
      nextGraph: 0,
      legend: this.m_Legend,
      zeroX: 0,
      zeroY: 0,
    };

    if(parent)
      this.parent = parent;
  }
  addGraph(value: DataGraphBase) { this.m_Graphs.push(value); value.m_setParentDiagramm(this); return this; }

  set title(value: string) { this.m_Heading.innerHTML = value; }
  get title(): string { return this.m_Heading.innerHTML; }
  setTitle(value: string) { this.title = value; return this; }

  update()
  {
    let svg = this.m_DiagrammProperties.node;
    svg.clear();
    svg.node.getBBox(); // important for svg.node.height.baseVal.value
    this.m_DiagrammProperties.height = svg.node.height.baseVal.value * (100 - Defines.offSetBorders) / 100;
    this.m_DiagrammProperties.width = svg.node.width.baseVal.value * (100 - Defines.offSetBorders) / 100;
  }

  set parent(value: Container)
  {
    if(this.m_Parent == value)
      return;
    value.appendChild(this);
    this.update();
  }

  set xAxis(value: AxisBase) { value.m_setParentDiagramm(this); this.m_DiagrammProperties.XAxis = value; value.type = AxisType.x; this.m_XAxis = value; }
  set yAxis(value: AxisBase) { value.m_setParentDiagramm(this); this.m_DiagrammProperties.YAxis = value; value.type = AxisType.y; this.m_YAxis = value; }

  plot()
  {
    this.update();
    this.m_XAxis.create();
    this.m_YAxis.create();
    let len = this.m_Graphs.length;
    for(let i = 0; i < len; i++)
      this.m_Graphs[i].create();
  }

  m_getDiagrammProperites() { return this.m_DiagrammProperties; }

  private m_XAxis: AxisBase;
  private m_YAxis: AxisBase;

  private m_Heading: HTMLHeadingElement;
  private m_Legend: HTMLDivElement;

  private m_Graphs: DataGraphBase[] = [];
  private m_DiagrammProperties: DiagrammProperties;
  private m_Parent: Container;
}