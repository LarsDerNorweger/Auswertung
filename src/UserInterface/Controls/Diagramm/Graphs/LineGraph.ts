/*
    Test 2022

    Authors: Colin Böttger
*/

import { $ } from '../../../../runtime.js';
import { DataGraphBase } from './DataGraphBase.js';
import { Value } from './Interface.js';

export class LineGraph extends DataGraphBase
{
  constructor(values: Value[]) { super(values); }

  create(): void
  {
    this.m_GraphPoints.length = 0;
    let val = this.m_values;
    let len = val.length;
    this.lastPoint = [];

    for(let i = 0; i < len; i++)
      this.renderPoint(val[i]);
  }

  private renderPoint(value: Value)
  {
    let x = this.DiagrammProperties.XAxis;
    let y = this.DiagrammProperties.YAxis;
    if(!x || !y)
      throw new Error("No Axis are defiened");

    let coox = x.getCoordiantesFrom(value.x);
    let cooy = y.getCoordiantesFrom(value.y);
    if(!this.lastPoint)
    {
      this.lastPoint = [];
      this.lastPoint[0] = coox;
      this.lastPoint[1] = cooy;
      return;
    }

    let node = this.DiagrammProperties.node;
    this.m_GraphPoints.push(
      new $.SVG.SvgLine(node)
        .setStart(this.lastPoint[0], this.lastPoint[1])
        .setEnd(coox, cooy)
        .setColor(this.getStringColor())
        .create()
    );

    this.lastPoint[0] = coox;
    this.lastPoint[1] = cooy;

    if(value.name)
      new $.SVG.SvgText(node)
        .setX(coox + 10)
        .setY(cooy + 10)
        .setRotation(-45)
        .setText(value.name)
        .create();
  };

  private lastPoint?: number[];
}