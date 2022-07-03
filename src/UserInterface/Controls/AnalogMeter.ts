/*
    Test 2022

    Authors: Colin Böttger
*/

export { AnalogMeter };

import { Control } from '../control.js';
import { $ } from '../../runtime.js';
import { Container } from '../container.js';

const CssClassNames =
{
  node: "AnalogMeter",
  value: "AnalogMeter_Value",
  heading: "AnalogMeter_Heading",
};

interface AnalogMeterParameters
{
  min: number,
  max: number,
  range: number,

  radius: number,
  width: number,
  height: number,
  middle: number,
}

class AnalogMeter extends Control
{
  node: HTMLElement;

  constructor(min: number, max: number, parent?: Container)
  {
    super();
    this.node = $.create('div');
    this.node.classList.add(CssClassNames.node);

    this.m_heading = $.create('div', this.node);
    this.m_heading.classList.add(CssClassNames.heading);

    this.m_svg = new $.SVG.Svg(this.node);

    this.m_valueField = $.create('div', this.node);
    this.m_valueField.classList.add(CssClassNames.value);

    this.m_Parameters = {
      min: min,
      max: max,
      range: max - min,

      height: 0,
      width: 0,
      middle: 0,
      radius: 0,
    };
    if(parent)
      this.parent = parent;
  }

  update()
  {
    this.m_svg.clear();
    this.m_svg.node.getBBox();
    let width = this.m_svg.node.width.baseVal.value;


    this.m_Parameters.height = width / 2;
    this.m_Parameters.middle = width / 2;
    this.m_Parameters.radius = width / 2 - ((width / 2) * 30 / 100);
    this.m_Parameters.width = width;
    this.render();
  }

  set parent(value: Container)
  {
    value.appendChild(this);
    this.update();
  }
  set value(value: number)
  {
    this.m_valueField.innerHTML = value.toString();
    let range = this.m_Parameters.range;
    let min = this.m_Parameters.min;
    let max = this.m_Parameters.max;
    if(value > max)
      value = max;
    else if(value < min)
      value = min;

    if(min < 0)
      value = value + min * -1;
    if(value < 0)
      value *= -1;

    this.setPointerValue((180 / range) * value);
  }
  setValue(value: number) { this.value = value; return this; }

  set title(value: string) { this.m_heading.innerHTML = value; }
  get title(): string { return this.m_heading.innerHTML; }
  setTitle(value: string) { this.title = value; return this; }

  private setPointerValue(degree: number)
  {
    this.calculateCircleCoordinates(degree, this.m_Parameters.radius, (x, y) => this.m_pointer.setEnd(x, y));
    this.m_pointer.create();
  }

  private render()
  {
    this.m_svg.height = this.m_Parameters.height;

    if(this.m_Parameters.radius < 0)
      throw new Error("Scale out of range");

    new $.SVG.SvgEllipse(this.m_svg)
      .setX(this.m_Parameters.middle)
      .setY(this.m_Parameters.height)
      .setRadius(this.m_Parameters.radius)
      .setColor("#F0F0F0")
      .create();

    this.m_pointer = new $.SVG.SvgLine(this.m_svg);
    this.m_pointer.setStart(
      this.m_Parameters.middle,
      this.m_Parameters.height
    );
    this.m_pointer.setEnd(
      this.m_Parameters.middle,
      this.m_Parameters.height - this.m_Parameters.radius
    );
    this.m_pointer.create();
    this.value = this.m_Parameters.min + this.m_Parameters.range / 2;


    this.createScale();
  }

  private createScale()
  {
    let r = this.m_Parameters.radius + (this.m_Parameters.radius * 10) / 100;
    let min = this.m_Parameters.min;
    let range = this.m_Parameters.range;

    this.setTextOnCircle(0, r, min.toString());
    this.setTextOnCircle(45, r, (min + (range / 4)).toPrecision(2).toString());
    this.setTextOnCircle(90, r, (min + (range / 2)).toPrecision(2).toString());
    this.setTextOnCircle(135, r, (min + (range / 4 * 3)).toPrecision(2).toString());
    this.setTextOnCircle(180, r, this.m_Parameters.max.toString());
  }

  private setTextOnCircle(degree: number, radius: number, text: string)
  {
    let t = new $.SVG.SvgText(this.m_svg);
    this.calculateCircleCoordinates(degree, radius, (x, y) => t.setX(x).setY(y));
    t.text = text;
    t.create();
    let b = t.node.getBBox();
    if(degree <= 95 && degree > 85)
      t.setX(t.x - b.width / 2);
    if(degree > 95)
      t.setX(t.x - b.width);
    t.create();

  }
  private calculateCircleCoordinates(degree: number, radius: number, cb: (x: number, y: number) => void): void
  {
    let rad = degree * Math.PI / 180;
    let x = radius * Math.cos(rad) + this.m_Parameters.middle;
    let y = this.m_Parameters.height - (radius * Math.sin(rad));
    cb(x, y);
  }

  private m_svg: $.SVG.Svg;
  private m_pointer: $.SVG.SvgLine;
  private m_heading: HTMLDivElement;
  private m_valueField: HTMLDivElement;
  private m_Parameters: AnalogMeterParameters;
}