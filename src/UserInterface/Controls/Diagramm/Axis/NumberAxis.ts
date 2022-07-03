/*
    Test 2022

    Authors: Colin Böttger
*/

import { calculateRange } from '../DiagrammHelpers.js';
import { AxisBase, AxisType } from './AxisBase.js';
import { $ } from '../../../../runtime.js';

export class NumberAxis extends AxisBase
{
  constructor(from: number, to: number, stepSize?: number)
  {
    super();
    if(from > to)
      throw new Error('Axis is not Ascendenging');

    if(!stepSize)
      stepSize = 1;
    this.m_Stepsize = stepSize;

    this.m_min = from;
    this.m_max = to;

    this.m_range = calculateRange(from, to);
  }

  getCoordiantesFrom(value: number): number
  {
    if(typeof value == 'string')
      throw new Error(`Unsupported DataType: ${typeof value}, ${value}`);

    switch(this.m_axisType)
    {
      case AxisType.x:
        return this.DiagrammProperties.zeroX + <number>value * this.m_pixelStepsize;

      case AxisType.y:
        return this.DiagrammProperties.zeroY - <number>value * this.m_pixelStepsize;

      default:
        return NaN;
    }
  }

  protected createX(): void
  {
    let value = this.m_min;

    let zeroY = this.DiagrammProperties.zeroY;
    let zeroX = this.DiagrammProperties.zeroX;
    let svg = this.m_Svg;

    let xEnd = zeroX + this.m_max * this.m_pixelStepsize;

    new $.SVG.SvgLine(svg)
      .setStart(zeroX + value * this.m_pixelStepsize, zeroY)
      .setEnd(xEnd, zeroY)
      .create();

    if(this.m_label)
    {
      let t = new $.SVG.SvgText(svg)
        .setText(this.m_label)
        .create();
      t.setX(xEnd - t.BorderBox.width)
        .setY(zeroY - 5)
        .create();
    }

    let textnumber = this.m_range / 10;

    while(value <= this.m_max)
    {
      let x = zeroX + value * this.m_pixelStepsize;
      new $.SVG.SvgLine(svg)
        .setStart(x, zeroY + 3)
        .setEnd(x, zeroY - 3)
        .create();

      if(value % textnumber == 0)
      {
        let elem = new $.SVG.SvgText(svg)
          .setText(value.toString())
          .create();
        elem
          .setX(x - elem.BorderBox.width / 2)
          .setY(zeroY + 20)
          .create();
      }
      value += this.m_Stepsize;
    }


  }

  protected createY(): void
  {
    let value = this.m_min;

    let zeroY = this.DiagrammProperties.zeroY;
    let zeroX = this.DiagrammProperties.zeroX;

    let svg = this.m_Svg;
    new $.SVG.SvgLine(svg)
      .setStart(zeroX, zeroY - value * this.m_pixelStepsize)
      .setEnd(zeroX, zeroY - this.m_max * this.m_pixelStepsize)
      .create();

    if(this.m_label)
    {
      let elem = new $.SVG.SvgText(svg)
        .setText(this.m_label)
        .setX(zeroX + 20)
        .create();
      elem.setY(elem.BorderBox.width)
        .setRotation(-90)
        .create();
    }

    let textnumber = this.m_range / 10;

    while(value <= this.m_max)
    {
      let y = zeroY - value * this.m_pixelStepsize;
      new $.SVG.SvgLine(svg)
        .setStart(zeroX + 3, y)
        .setEnd(zeroX - 3, y)
        .create();

      if(value % textnumber == 0 && value != 0)
      {
        let elem = new $.SVG.SvgText(svg)
          .setText(value.toString())
          .create();
        elem
          .setY(y + elem.BorderBox.height / 4).setX(zeroX + 10)
          .create();
      }
      value += this.m_Stepsize;
    }

  }

  protected calculateNullPoint(): number
  {
    this.calculateAxisParameters();
    if(this.m_min < 0 || this.m_min > 0)
      return (this.m_range - this.m_max) * this.m_pixelStepsize;

    if(this.m_min < 0 && this.m_max < 0)
      return this.DiagrammProperties.width;
    return 0; // TODO correct point
  }

  private calculateAxisParameters(): void
  {
    this.m_Stepcount = this.m_range / this.m_Stepsize;
    this.m_Stepdistance = this.DiagrammProperties.width / this.m_Stepcount;
    this.m_pixelStepsize = this.PixelAxisLenght / this.m_range;
  }

  private m_Stepsize: number;
  private m_pixelStepsize: number;
  private m_range: number;
  private m_Stepdistance: number;
  private m_Stepcount: number;
  private m_min: number;
  private m_max: number;
}