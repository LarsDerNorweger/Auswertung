/*
    Test 2022

    Authors: Colin Böttger
*/

import { SvgBase } from './SvgBase.js';
export { Svg, rgb };

function rgb(r: number, g: number, b: number): number { return r * 256 * 256 + g * 256 + b; }

class Svg
{
  node: SVGSVGElement;
  constructor(target?: HTMLElement)
  {
    this.node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if(target)
      target.appendChild(this.node);
  }

  clear()
  {
    while(this.node.lastChild)
      this.node.lastChild.remove();
  }

  get classList(): DOMTokenList { return this.node.classList; }

  set width(value: number) { this.node.setAttribute('width', value.toString()); }
  setWidth(value: number) { this.width = value; return this; }

  set height(value: number) { this.node.setAttribute('height', value.toString()); }
  setHeight(value: number) { this.height = value; return this; }

  appandChild(value: SvgBase) { this.node.appendChild(value.node); }
  add(target: HTMLElement) { target.appendChild(this.node); };
}