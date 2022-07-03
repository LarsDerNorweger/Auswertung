/*
    Test 2022

    Authors: Colin Böttger
*/

import { AxisBase } from './AxisBase.js';
import { $ } from '../../../../runtime.js';

export class StringAxis extends AxisBase
{
  constructor(values: string[])
  {
    super();

    let len = values.length;

    if(len < 1)
      throw new Error("StringAxis require Arguments");

    this.m_values = values;
  }

  getCoordiantesFrom(value: string): number
  {
    if(typeof value == 'number')
      throw new Error(`Unsupported DataType: ${typeof value}, ${value}`);

    let i = this.m_values.indexOf(value);

    if(i < 0)
      throw new Error(`${value} not found`);

    return (i + 1) * this.m_pixelStepsize;
  }

  protected calculateNullPoint(): number { this.m_pixelStepsize = this.PixelAxisLenght / (this.m_values.length + 1); return 0; }

  protected createX(): void
  {
    let zeroY = this.DiagrammProperties.zeroY;
    let zeroX = this.DiagrammProperties.zeroX;
    let len = this.m_values.length;
    let svg = this.m_Svg;


    new $.SVG.SvgLine(svg)
      .setStart(0, zeroY)
      .setEnd(zeroX + (len + 1) * this.m_pixelStepsize, zeroY)
      .create();

    if(this.m_label)
    {
      let elem = new $.SVG.SvgText(svg)
        .setText(this.m_label)
        .create();
      elem.setX(this.DiagrammProperties.width - elem.BorderBox.width)
        .setY(zeroY - 10)
        .create();
    }
    for(let i = 0; i < len; i++)
    {
      let x = (i + 1) * this.m_pixelStepsize;
      new $.SVG.SvgLine(svg)
        .setStart(x, zeroY - 3)
        .setEnd(x, zeroY + 3)
        .create();

      let elem = new $.SVG.SvgText(svg)
        .setText(this.m_values[i])
        .create();
      elem
        .setX(x)
        .setY(zeroY + 20)
        .setRotation(45)
        .create();
    }
  }

  protected createY(): void
  {
    let zeroY = this.DiagrammProperties.zeroY;
    let zeroX = this.DiagrammProperties.zeroX;
    let len = this.m_values.length;
    let svg = this.m_Svg;

    new $.SVG.SvgLine(svg)
      .setStart(zeroX, 0)
      .setEnd(zeroX, zeroY + (len + 1) * this.m_pixelStepsize)
      .create();
    console.log(this.m_label);

    if(this.m_label)
      new $.SVG.SvgText(svg)
        .setText(this.m_label)
        .setX(zeroX + 5)
        .setY(zeroY + 5)
        .create();

    for(let i = 0; i < len; i++)
    {
      let y = (i + 1) * this.m_pixelStepsize;
      new $.SVG.SvgLine(svg)
        .setStart(zeroX - 3, y)
        .setEnd(zeroX + 3, y)
        .create();

      let elem = new $.SVG.SvgText(svg)
        .setText(this.m_values[i])
        .create();
      elem
        .setX(zeroX + 10)
        .setY(y + elem.BorderBox.height / 4)
        .create();
    }
  }

  private m_values: string[];
  private m_pixelStepsize: number;
}