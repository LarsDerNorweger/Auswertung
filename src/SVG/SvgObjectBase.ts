/*
    Test 2022

    Authors: Colin Böttger
*/

import { SvgObject } from "./SvgObject.js";

export abstract class SvgObjectBase extends SvgObject
{
  abstract node: SVGElement;

  set color(value: string)
  {
    if(value.match(/#[0-9 A-F]{3,6}/) && (value.length == 4 || value.length == 7))
    {
      this.node.setAttribute("fill", value);
      this.node.setAttribute("stroke", value);
      this.m_color = value;
    }
    else
      throw new Error;
  }
}