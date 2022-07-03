/*
    Test 2022

    Authors: Colin Böttger
*/

import { SvgObject } from "./SvgObject.js";

export abstract class SvgPathBase extends SvgObject
{
  abstract node: SVGPathElement;

  set color(value: string)
  {
    if(value.match(/#[0-9 A-F a-f]{3,6}/) && (value.length == 4 || value.length == 7))
    {
      this.node.setAttribute("stroke", value);
      this.node.setAttribute("fill", value);
      this.m_color = value;
    }
    else
      throw new Error;
  }
  setColor(value: string) { this.color = value; return this; }
}