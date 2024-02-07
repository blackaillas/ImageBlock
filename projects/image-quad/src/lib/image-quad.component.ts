import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block.component';
import { trigger, style, animate, transition } from '@angular/animations';

export type Mode = 'fullRandom' | 'random' | 'fixedOne' | 'fixedTwo' | 'fixedThree';

export interface Setting {
  q1?: boolean | Setting;
  q2?: boolean | Setting;
  q3?: boolean | Setting;
  q4?: boolean | Setting;
}

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
    trigger('inOutAnimation',
      [
        transition(':enter',
          [
            style({ opacity: 0 }),
            animate('2s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(':leave',
          [
            style({ opacity: 1 }),
            animate('1s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ImageQuadComponent implements OnChanges {
  @Input() setting?: Setting = undefined;
  @Input() mode: Mode = 'fullRandom';
  @Input() size: number = 160; // in px
  @Input() level: number = 1;
  @Input() gap: number = 4; // in px
  @Input() imagePaths: string[] = [];

  ngOnInit() {
    this.imagePaths = [
      './assets/female_1.png',
      './assets/female_2.png',
      './assets/female_3.png',
      './assets/female_4.png',
      './assets/female_5.png',
      './assets/female_6.png',
      './assets/male_1.png',
      './assets/male_2.png',
      './assets/male_3.png',
    ];
    if (this.level === 1) {
      setInterval(() => {
        this.setting = undefined;
        setTimeout(() => {
          this.generateLayout();
        }, 1000);
      }, 10000);
    }
  }

  ngOnChanges() {
    this.generateLayout();


  }

  isSubType(value?: boolean | Setting): boolean {
    return typeof value === 'object';
  }

  castToSetting(value: boolean | Setting): Setting {
    return value as Setting;
  }

  getImage(): string {
    return this.imagePaths[(Math.floor(Math.random() * this.imagePaths.length))];
  }

  private getRandomQuadrant(): Setting {
    return {
      q1: Math.random() > 0.5,
      q2: Math.random() > 0.5,
      q3: Math.random() > 0.5,
      q4: Math.random() > 0.5
    };
  }

  private generateLayout(): void {
    if (!this.setting) {
      if (this.mode === 'fullRandom') {
        this.setting = {
          q1: Math.random() > 0.33 ? true : Math.random() > 0.6 ? false : this.getRandomQuadrant(),
          q2: Math.random() > 0.33 ? true : Math.random() > 0.6 ? false : this.getRandomQuadrant(),
          q3: Math.random() > 0.33 ? true : Math.random() > 0.6 ? false : this.getRandomQuadrant(),
          q4: Math.random() > 0.33 ? true : Math.random() > 0.6 ? false : this.getRandomQuadrant()
        };
      } else if (this.mode === 'random') {
        this.setting = {
          q1: this.getRandomQuadrant(),
          q2: this.getRandomQuadrant(),
          q3: this.getRandomQuadrant(),
          q4: this.getRandomQuadrant()
        };
        // Set one of the quadrants to be a big picture
        const prop: keyof Setting = `q${Math.floor(Math.random() * 4) + 1}` as keyof Setting;
        this.setting[prop] = true;
      } else if (this.mode === 'fixedOne') {
        this.setting = {
          q1: true,
          q2: { q1: true, q2: false, q3: true, q4: true },
          q3: { q1: false, q2: true, q3: false, q4: false },
          q4: { q1: true, q2: false, q3: true, q4: false }
        };
      } else if (this.mode === 'fixedTwo') {
        this.setting = {
          q1: true,
          q2: { q1: true, q2: false, q3: true, q4: true },
          q3: { q1: false, q2: false, q3: false, q4: false },
          q4: { q1: true, q2: true, q3: false, q4: true }
        };
      } else if (this.mode === 'fixedThree') {
        this.setting = {
          q1: { q1: true, q2: true, q3: false, q4: true },
          q2: true,
          q3: { q1: false, q2: true, q3: false, q4: true },
          q4: { q1: true, q2: false, q3: false, q4: true }
        };
      }
    }
  }
}
