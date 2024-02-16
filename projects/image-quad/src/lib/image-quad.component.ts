import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
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
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
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
   * @type 'fadeAnimation' | 'spinAnimation' | 'scaleAnimation' | 'vortexAnimation' | 'disabled'
  */
  @Input() animation: 'fadeAnimation' | 'spinAnimation' | 'scaleAnimation' | 'vortexAnimation' | 'disabled' = 'fadeAnimation';

  private imageService: ImageService = inject(ImageService);

  protected layout?: Layout = undefined;
  protected layoutKeys: string[] = ['q1', 'q2', 'q3', 'q4'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode'] || changes['imagePaths']) {
      this.generateLayout();
    }
  }

  protected isSubType(value: boolean | Layout, prop: string): boolean {
    return typeof (value as Layout)[prop as keyof Layout] === 'object';
  }

  protected castToLayout(value: boolean | Layout, prop: string): Layout {
    return (value as Layout)[prop as keyof Layout] as Layout;
  }

  protected isVisible(value: boolean | Layout, prop: string): boolean {
    return (value as Layout)[prop as keyof Layout] as boolean === true;
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
    this.imageService.resetUsedIndexes();
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
      this.layout = { ...fixedLayouts[this.mode] };
    }
  }
}
