/*
    Test 2022

    Authors: Colin Böttger
*/

import { Svg } from './Svg-Base.js';
import { SvgBase } from './SvgBase.js';
import { createSVG } from './SvgObject.js';

export class SvgEllipse extends SvgBase
{
  node: SVGEllipseElement;

  constructor(target?: Svg)
  {
    super();
    this.node = createSVG('ellipse');
    if(target)
      target.appandChild(this);
    this.color = "#000";
  }


  set x(value: number) { this.m_x = value; }
  get x(): number { return this.m_x; }
  setX(value: number) { this.m_x = value; return this; }

  set y(value: number) { this.m_y = value; }
  get y(): number { return this.m_y; }
  setY(value: number) { this.m_y = value; return this; }

  set color(value: string)
  {
    if(value.match(/#[0-9 A-F]{3,6}/) && (value.length == 4 || value.length == 7))
    {
      this.node.setAttribute("fill", value);
      this.node.setAttribute("stroke", value);
    }
    else
      throw new Error;
  }
  setColor(value: string) { this.color = value; return this; }

  set rardiusX(value: number) { this.m_rx = value; }
  set radiusY(value: number) { this.m_ry = value; }
  set radius(value: number) { this.m_rx = value; this.m_ry = value; }
  setRadius(value: number) { this.radius = value; return this; }

  create(): SvgBase
  {
    this.node.setAttribute("cx", this.m_x.toString());
    this.node.setAttribute("cy", this.m_y.toString());
    this.node.setAttribute("rx", this.m_rx.toString());
    this.node.setAttribute("ry", this.m_ry.toString());

    //<ellipse cx="170" cy="200" rx="150" ry="180" fill="ivory" stroke="orange" />
    return this;
  }

  private m_x: number = 0;
  private m_y: number = 0;
  private m_rx: number = 0;
  private m_ry: number = 0;
}