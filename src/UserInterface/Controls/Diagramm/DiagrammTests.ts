/*
    Test 2022

    Authors: Colin Böttger
*/

import { $ } from '../../../runtime.js';
import { calculateRange, getHigest, getLowest, isAscendenging } from './DiagrammHelpers.js';

// range calculation

$.Assert.areEqual(calculateRange(-10, 10), 20);
$.Assert.areEqual(calculateRange(-20, -10), 10);
$.Assert.areEqual(calculateRange(10, 10), 0);
$.Assert.areEqual(calculateRange(20, 40), 20);

let testarray1 = [[1, 3, 5, 2]];
let testarray2 = [[1, 3, -5, 2]];

let testarray3 = [
  [1, 5, 2, 3],
  [-2, 3, 2, 1],
  [10, 5, 2, 1]
];

let testarray4 = [
  [10, 5, 2, 3],
  [-2, 3, 2, 1],
  [1, -5, 2, 1]
];

let testarray5 = [
  [1, 5, 2, 3],
  [2, 3, 2, 1],
  [0, 5, 20, 1]
];
let testarray6 = [[-2, 1, 5, 7]];

$.Assert.areEqual(getHigest(testarray1), 5);
$.Assert.areEqual(getHigest(testarray2), 3);
$.Assert.areEqual(getHigest(testarray3), 10);
$.Assert.areEqual(getHigest(testarray4), 10);
$.Assert.areEqual(getHigest(testarray5), 20);
$.Assert.areEqual(getHigest(testarray6), 7);
$.Assert.areEqual(getHigest([[]]), 0);

$.Assert.areEqual(getLowest(testarray1), 1);
$.Assert.areEqual(getLowest(testarray2), -5);
$.Assert.areEqual(getLowest(testarray3), -2);
$.Assert.areEqual(getLowest(testarray4), -5);
$.Assert.areEqual(getLowest(testarray5), 0);
$.Assert.areEqual(getLowest(testarray6), -2);
$.Assert.areEqual(getLowest([[]]), 0);

$.Assert.areEqual(isAscendenging(testarray1[0]), false);
$.Assert.areEqual(isAscendenging(testarray1[0]), false);
$.Assert.areEqual(isAscendenging([]), false);
$.Assert.areEqual(isAscendenging(testarray6[0]), true);

$.Assert.end("DiagrammHelpers");
