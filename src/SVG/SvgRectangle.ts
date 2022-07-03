/*
    Test 2022

    Authors: Colin Böttger
*/

import { Svg } from './Svg-Base.js';
import { createSVG } from "./SvgObject.js";
import { SvgObjectBase } from './SvgObjectBase.js';

export class SvgRectangle extends SvgObjectBase
{
  node: SVGPathElement;
  constructor(parent?: Svg)
  {
    super();
    this.node = createSVG('path');
    this.color = "#000";
    if(parent)
      parent.appandChild(this);
  }

  create(): SvgRectangle
  {
    this.node.setAttribute('d', `M${this.coords[0]} ${this.coords[1]} H${this.coords[2]} V${this.coords[3]} H${this.coords[0]} V ${this.coords[1]}`);
    return this;
  }
}