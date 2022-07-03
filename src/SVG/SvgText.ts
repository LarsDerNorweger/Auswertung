/*
    Test 2022

    Authors: Colin Böttger
*/

import { Svg } from './Svg-Base.js';
import { SvgBase } from './SvgBase.js';
import { createSVG } from './SvgObject.js';

export class SvgText extends SvgBase
{
  node: SVGTextElement;

  constructor(target?: Svg)
  {
    super(target);
    this.node = createSVG('text');
    this.node.setAttribute("fill", "transparent");
    this.color = "#000";
    if(target)
      target.appandChild(this);
  }

  set text(value: string) { this.node.innerHTML = value; }
  get text(): string { return this.node.innerHTML; }
  setText(value: string) { this.text = value; return this; }

  set x(value: number) { this.m_x = value; }
  get x(): number { return this.m_x; }
  setX(value: number) { this.m_x = value; return this; }

  set y(value: number) { this.m_y = value; }
  get y(): number { return this.m_y; }
  setY(value: number) { this.m_y = value; return this; }


  //TODO korrekt rotationpoint
  set rotate(value: number) { this.node.setAttribute("transform", `rotate(${value},${this.m_x},${this.m_y})`); }
  setRotation(value: number) { this.rotate = value; return this; }

  set color(value: string)
  {
    if(value.match(/#[0-9 A-F]{3,6}/) && (value.length == 4 || value.length == 7))
      this.node.setAttribute("fill", value);
    else
      throw new Error;
  }

  create(): SvgText
  {
    this.node.setAttribute('y', this.m_y.toString());
    this.node.setAttribute('x', this.m_x.toString());
    return this;
  }

  private m_x: number = 0;
  private m_y: number = 0;

}