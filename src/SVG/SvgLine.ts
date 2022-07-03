/*
    Test 2022

    Authors: Colin Böttger
*/

import { Svg } from './Svg-Base.js';
import { createSVG } from './SvgObject.js';
import { SvgPathBase } from './SvgPathBase.js';

export class SvgLine extends SvgPathBase
{
  node: SVGPathElement;

  constructor(parent?: Svg)
  {
    super();
    this.node = createSVG('path');
    parent?.node.appendChild(this.node);
    this.node.setAttribute("fill", "transparent");
    this.color = "#000";
  }


  create(): SvgLine
  {
    this.node.setAttribute('d', `M${this.coords[0]} ${this.coords[1]} L${this.coords[2]} ${this.coords[3]}`);
    return this;
  }
}