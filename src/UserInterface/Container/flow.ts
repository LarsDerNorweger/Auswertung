/*
    Test 2022

    Authors: Colin Böttger
*/

import { Container } from '../container.js';
import { CssClassNames } from '../CssClassNames.js';
import { Page } from '../Page.js';
import { create } from '../UI-helper.js';

export class CenterFlowContainer extends Container
{
  node: HTMLElement;

  constructor(parent?: Page)
  {
    super();
    this.node = create('div');
    this.heading = create('h1', this.node);
    this.content = create('div', this.node);

    this.node.classList.add(CssClassNames.Container.base);
    this.heading.classList.add(CssClassNames.Container.heading);

    this.content.classList.add(CssClassNames.Container.flow);
    this.content.classList.add(CssClassNames.Container.content);
    if(parent)
      this.parent = parent;
  }
  protected content: HTMLElement;
  protected heading: HTMLHeadingElement;
}