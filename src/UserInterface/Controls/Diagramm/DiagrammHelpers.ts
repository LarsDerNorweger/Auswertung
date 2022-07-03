/*
    Test 2022

    Authors: Colin Böttger
*/

export
{
  calculateRange,
  getHigest,
  getLowest,
  isAscendenging,
};

function calculateRange(from: number, to: number)
{
  let range = to - from;
  if(range < 0)
    range = range * -1;
  return range;
}

function getHigest(inp: number[][])
{
  let len = inp.length;
  let max;
  for(let i = 0; i < len; i++)
  {
    let list = [...inp[i]];
    list = list.sort((a, b) => a - b);
    let l = list.length;
    if(!max || max < list[l - 1])
      max = list[l - 1];
  }
  if(!max)
    return 0;
  return max;
}

function getLowest(inp: number[][])
{
  let len = inp.length;
  let min;
  for(let i = 0; i < len; i++)
  {
    let list = [...inp[i]];
    list = list.sort((a, b) => a - b);
    if(!min || min > list[0])
      min = list[0];
  }
  if(!min)
    return 0;
  return min;
}

function isAscendenging(value: number[])
{
  let len = value.length;
  if(len == 0)
    return false;
  let now: number;
  let pref: number = value[0];
  for(let i = 1; i < len; i++)
  {
    now = value[i];

    if(pref > now)
      return false;
    pref = now;
  }
  return true;
}
