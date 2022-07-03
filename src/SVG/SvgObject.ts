/*
    Test 2022

    Authors: Colin Böttger
*/

import { SvgBase } from "./SvgBase.js";

let colors = {
  selected: "#FF0000"
};

export abstract class SvgObject extends SvgBase
{
  abstract create(): SvgObject;

  set onClick(cb: (e: MouseEvent) => void) { this.node.onmousedown = cb; }

  set onSelect(value: (isSelected: boolean, object: SvgObject) => void) { this.m_onselect = value; }
  set isSelected(value: boolean)
  {
    this.node.setAttribute("stroke", value ? colors.selected : this.m_color);
    this.m_isSelected = value;
    if(this.m_onselect)
      this.m_onselect(this.m_isSelected, this);
  }
  get isSelected(): boolean { return this.m_isSelected; }
  setIsSelected(value: boolean) { this.isSelected = value; return this; }

  get x(): number { return this.coords[0]; }
  set x(value: number) { this.coords[0] = value; }

  get y(): number { return this.coords[1]; }
  set y(value: number) { this.coords[1] = value; }

  setStart(x: number, y: number)
  {
    this.coords[0] = x;
    this.coords[1] = y;
    return this;
  }
  setEnd(x: number, y: number)
  {
    this.coords[2] = x;
    this.coords[3] = y;
    this.coords[4] = x - this.coords[0];
    this.coords[5] = y - this.coords[1];
    return this;
  }

  moveTopTo(x: number, y: number)
  {
    this.coords[2] = this.coords[4] + x;
    this.coords[3] = this.coords[5] + y;
    this.coords[0] = x;
    this.coords[1] = y;
    this.create();
    return this;
  }

  moveBottomTo(x: number, y: number)
  {
    this.coords[0] = x - this.coords[4];
    this.coords[1] = y - this.coords[5];
    this.coords[2] = x;
    this.coords[3] = y;
    this.create();
    return this;
  }

  protected coords: number[] = [0, 0, 0, 0, 0, 0];
  protected m_isSelected: boolean = false;
  protected m_color!: string;

  private m_onselect?: (isSelected: boolean, object: SvgObject) => void;

}

export function createSVG<K extends keyof SVGElementTagNameMap>(qualifiedName: K): SVGElementTagNameMap[K] { return document.createElementNS("http://www.w3.org/2000/svg", qualifiedName); }