import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { fixedLayouts } from './fixed-layouts';

export type Mode = 'fullRandom' | 'random' | 'fixedOne' | 'fixedTwo' | 'fixedThree' | Layout;

export interface Layout {
  q1?: boolean | Layout;
  q2?: boolean | Layout;
  q3?: boolean | Layout;
  q4?: boolean | Layout;
}

/**
 * Simple little component to display images in a grid with fashion.
 */
@Component({
  selector: 'lib-imageQuad',
  standalone: true,
  imports: [CommonModule, BlockComponent],
  templateUrl: './image-quad.component.html',
  styles: `.q {
      display: grid;
      grid-template: auto auto / auto auto;
  }`,
  animations: [
    trigger('simpleFadeAnimation', [
      transition('*=>*', [
        style({ opacity: 0 }),
        animate('2s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ImageQuadComponent implements OnChanges {
  /** Configure the behaviour of the layout with fixed predefined ones or with custom setups. 
   * Also can use random layouts. 
   * @type 'fullRandom' | 'random' | 'fixedOne' | 'fixedTwo' | 'fixedThree' | Layout
   * */
  @Input({ required: true }) mode: Mode = 'fullRandom';
  /** The list of images that will be randomly selected. E.g.: ./assets/image.png */
  @Input({ required: true }) imagePaths: string[] = [];
  /** Size of level 1 image in pixel */
  @Input() size: number = 160; // in px
  /** Gap between the images in pixel */
  @Input() gap: number = 4; // in px
  /** Do NOT set this manually */
  @Input() level: number = 1;

  layout?: Layout = undefined;

  ngOnChanges(): void {
    this.generateLayout();
  }

  isSubType(value?: boolean | Layout): boolean {
    return typeof value === 'object';
  }

  castToLayout(value: boolean | Layout): Layout {
    return value as Layout;
  }

  getImage(): string | undefined {
    if (!this.imagePaths || this.imagePaths.length === 0) return undefined;

    return this.imagePaths[(Math.floor(Math.random() * this.imagePaths.length))];
  }

  private getRandomQuadrant(): Layout {
    return {
      q1: Math.random() > 0.5,
      q2: Math.random() > 0.5,
      q3: Math.random() > 0.5,
      q4: Math.random() > 0.5
    };
  }

  private generateLayout(): void {
    if (typeof this.mode === 'object') {
      this.layout = this.mode as Layout;
    }
    else if (this.mode === 'fullRandom') {
      this.layout = {
        q1: Math.random() > 0.33 ? true : Math.random() > 0.6 ? false : this.getRandomQuadrant(),
        q2: Math.random() > 0.33 ? true : Math.random() > 0.6 ? false : this.getRandomQuadrant(),
        q3: Math.random() > 0.33 ? true : Math.random() > 0.6 ? false : this.getRandomQuadrant(),
        q4: Math.random() > 0.33 ? true : Math.random() > 0.6 ? false : this.getRandomQuadrant()
      };
    } else if (this.mode === 'random') {
      this.layout = {
        q1: this.getRandomQuadrant(),
        q2: this.getRandomQuadrant(),
        q3: this.getRandomQuadrant(),
        q4: this.getRandomQuadrant()
      };
      // Set one of the quadrants to be a big picture
      const prop: keyof Layout = `q${Math.floor(Math.random() * 4) + 1}` as keyof Layout;
      this.layout[prop] = true;
    } else if (['fixedOne', 'fixedTwo', 'fixedThree'].includes(this.mode)) {
      this.layout = fixedLayouts[this.mode];
    }
  }
}
