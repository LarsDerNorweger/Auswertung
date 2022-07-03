/*
    Test 2022

    Authors: Colin Böttger
*/

export type ValueList = Value[];

export interface Value
{
  y: number | string,
  x: number | string,
  name?: string,
  color?: string,
}