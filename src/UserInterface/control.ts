/*
    Test 2022

    Authors: Colin Böttger
*/

import { Container } from './container.js';
import { Page } from './Page.js';

export abstract class Control {
  abstract node: HTMLElement;
  abstract set parent(value: Page | Container);
  get classList(): DOMTokenList { return this.node.classList; }
  remove() { this.node.remove(); }

}