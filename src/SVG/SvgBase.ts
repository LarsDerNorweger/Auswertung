/*
    Test 2022

    Authors: Colin Böttger
*/

import { Svg } from "./Svg-Base.js";

export abstract class SvgBase
{
  abstract node: SVGElement;
  abstract set color(value: string);

  get BorderBox(): DOMRect { this.create(); return this.node.getBoundingClientRect(); }

  constructor(parent?: Svg) { }
  abstract create(): SvgBase;

}