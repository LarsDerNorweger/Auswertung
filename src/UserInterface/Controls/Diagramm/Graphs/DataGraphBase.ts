/*
    Test 2022

    Authors: Colin Böttger
*/

import { $ } from '../../../../runtime.js';
import { Diagramm, DiagrammProperties, color } from '../Diagramm-Base.js';
import { Value } from './Interface.js';

import { create } from '../../../UI-helper.js';

export abstract class DataGraphBase
{
  protected DiagrammProperties: DiagrammProperties;
  protected m_values: Value[];

  constructor(values: Value[]) { this.m_values = values; }

  abstract create(): void;

  set name(value: string)
  {
    this.m_name = value;
    if(this.m_LegendEntry)
      this.m_LegendEntry.innerHTML = value;
  }
  get name(): string { return this.m_name; }
  setName(value: string) { this.name = value; }

  m_setParentDiagramm(value: Diagramm) { this.DiagrammProperties = value.m_getDiagrammProperites(); this.m_Svg = this.DiagrammProperties.node; this.createLegendEntry(); }

  private createLegendEntry()
  {

    this.m_LegendEntry = create(
      'p',
      this.DiagrammProperties.legend,
      this.m_name
        ? this.m_name
        : `Graph ${this.DiagrammProperties.nextGraph++}`
    );
    this.m_color = this.DiagrammProperties.nextColor;
    this.DiagrammProperties.nextColor = {
      red: this.m_color.red + 100,
      green: this.m_color.green,
      blue: this.m_color.blue
    };
    this.m_colorString = `#${this.normalizeColor(this.m_color.red)}${this.normalizeColor(this.m_color.green)}${this.normalizeColor(this.m_color.blue)}`;
    this.m_LegendEntry.setAttribute('style', `color:${this.m_colorString}`);
  }

  protected getStringColor(): string { return this.m_colorString; }

  private normalizeColor(color: number): string
  {
    if(color < 0 || color > 255)
      throw new Error(`ColorValue ${color} out of Range`);
    let r = color.toString(16);
    while(r.length < 2)
      r += "0";
    return r;
  }

  protected m_GraphPoints: $.SVG.SvgBase[] = [];
  protected m_Svg: $.SVG.Svg;
  private m_color: color;
  private m_colorString: string;
  private m_LegendEntry: HTMLParagraphElement;
  private m_name: string;

}