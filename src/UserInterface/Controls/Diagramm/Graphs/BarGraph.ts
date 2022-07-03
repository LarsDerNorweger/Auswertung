/*
    Test 2022

    Authors: Colin Böttger
*/

import { $ } from '../../../../runtime.js';
import { AxisBase } from '../Axis/AxisBase.js';
import { DataGraphBase } from './DataGraphBase.js';
import { Value } from './Interface.js';

export class Bargraph extends DataGraphBase
{
  constructor(values: Value[], BaseAxis: AxisBase) { super(values); this.m_Baseaxis = BaseAxis; }

  create(): void
  {
    this.m_GraphPoints.length = 0;
    let xAxis = this.DiagrammProperties.XAxis;
    let yAxis = this.DiagrammProperties.YAxis;

    if(xAxis && yAxis)
    {
      let val = this.m_values;
      let len = val.length;
      for(let i = 0; i < len; i++)
      {
        let value = this.m_values[i];
        this.renderPoint(xAxis.getCoordiantesFrom(value.x), yAxis.getCoordiantesFrom(value.y), value.name);
      }
    }
  }

  renderPoint(x: number, y: number, name?: string)
  {
    let graph: $.SVG.SvgBase;
    if(this.m_Baseaxis == this.DiagrammProperties.XAxis)
      graph = new $.SVG.SvgRectangle().setStart(x - 10, this.DiagrammProperties.zeroY).setEnd(x + 10, y).create();
    else if(this.m_Baseaxis == this.DiagrammProperties.YAxis)
      graph = new $.SVG.SvgRectangle().setStart(this.DiagrammProperties.zeroX, y - 10).setEnd(x, y + 10).create();
    else
      throw new Error("Axis dosnt match to Diagramm");
    this.DiagrammProperties.node.appandChild(graph!);
    this.m_GraphPoints.push(graph);
  }
  private m_Baseaxis: AxisBase;
}