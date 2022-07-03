/*
    Test 2022

    Authors: Colin Böttger
*/
import { $ } from '../../../../runtime.js';
import { Diagramm, DiagrammProperties } from '../Diagramm-Base.js';

export enum AxisType { x, y }

export abstract class AxisBase
{
  protected DiagrammProperties: DiagrammProperties;

  m_setParentDiagramm(value: Diagramm) { this.DiagrammProperties = value.m_getDiagrammProperites(); this.m_Svg = this.DiagrammProperties.node; }

  create(): void
  {
    switch(this.m_axisType)
    {
      case AxisType.x:
        return this.createX();

      case AxisType.y:
        return this.createY();

      default:
        throw new Error("No Axistype is set");
    }
  }


  set type(type: AxisType)
  {
    this.m_axisType = type;
    switch(this.m_axisType)
    {
      case AxisType.x:
        this.PixelAxisLenght = this.DiagrammProperties.width;
        this.DiagrammProperties.zeroX = this.calculateNullPoint();
        break;
      case AxisType.y:
        this.PixelAxisLenght = this.DiagrammProperties.height;
        this.DiagrammProperties.zeroY = this.PixelAxisLenght - this.calculateNullPoint();
        break;
    }
  }

  set label(value: string | undefined) { this.m_label = value; }
  get label(): string | undefined { return this.m_label; }
  setLabel(value?: string) { this.label = value; return this; }

  get type(): AxisType { return this.m_axisType; }

  abstract getCoordiantesFrom(value: string | number): number;

  protected abstract calculateNullPoint(): number;

  protected abstract createX(): void;
  protected abstract createY(): void;

  protected m_Svg: $.SVG.Svg;
  protected PixelAxisLenght: number;
  protected m_axisType: AxisType;
  protected m_label?: string = undefined;
}