import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block.component';
import { fixedLayouts } from './fixed-layouts';
import { ImageService } from './image.service';

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
  selector: 'ngx-image-quad',
  standalone: true,
  imports: [CommonModule, BlockComponent],
  providers: [ImageService],
  templateUrl: './image-quad.component.html',
  styles: `.q {
      display: grid;
      grid-template: auto auto / auto auto;
  }`
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
  /** Select your style of animation, or simply disable it. 
   * 
   * @type 'fadeAnimation' | 'spinAnimation' | 'disabled'
  */
  @Input() animation: 'fadeAnimation' | 'spinAnimation' | 'disabled' = 'fadeAnimation';

  private imageService: ImageService = inject(ImageService);

  protected layout?: Layout = undefined;
  protected layoutKeys: string[] = ['q1', 'q2', 'q3', 'q4'];

  ngOnChanges(): void {
    this.generateLayout();
  }

  isSubType(value: boolean | Layout, prop: string): boolean {
    return typeof (value as Layout)[prop as keyof Layout] === 'object';
  }

  castToLayout(value: boolean | Layout, prop: string): Layout {
    return (value as Layout)[prop as keyof Layout] as Layout;
  }

  isSubType2(value?: boolean | Layout): boolean {
    return typeof (value as Layout) === 'object';
  }

  castToLayout2(value: boolean | Layout): Layout {
    return value as Layout;
  }

  isVisible(value: boolean | Layout, prop: string): boolean {
    return (value as Layout)[prop as keyof Layout] as boolean === true;
  }

  getImage(visible: boolean): string | undefined {
    if (!this.imagePaths || this.imagePaths.length === 0 || !visible) return undefined;

    return this.imagePaths[this.imageService.getUniqueRandomIndex(this.imagePaths.length)];
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
