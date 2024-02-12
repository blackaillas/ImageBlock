import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, inject } from '@angular/core';
import { ImageService } from './image.service';
import { trigger, transition, style, animate } from '@angular/animations';

const defaultImage = 'data:image/png;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeAnimation', [
      transition('*=>*', [
        style({ opacity: 0 }),
        animate('{{ delay }}ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('spinAnimation', [
      transition('*=>*', [
        style({ transform: 'rotateY(90deg)' }),
        animate('{{ delay }}ms ease-in', style({ transform: 'rotateY(360deg)' }))
      ])
    ]),
    trigger('scaleAnimation', [
      transition('*=>*', [
        style({ transform: 'scale3d(0,0,0)' }),
        animate('{{ delay }}ms ease-in', style({ transform: 'scale3d(1, 1, 1)' }))
      ])
    ]),
    trigger('vortexAnimation', [
      transition('*=>*', [
        style({ transform: 'scale3d(0,0,0)  rotateZ(0deg)' }),
        animate('{{ delay }}ms ease-in', style({ transform: 'scale3d(1, 1, 1)  rotateZ(720deg)' }))
      ])
    ])
  ]
})
export class BlockComponent implements OnChanges {
  @Input({ required: true }) imagePaths: string[] = [];
  @Input() visible: boolean = true;
  @Input()
  set size(v: number) { // in px
    this._size = v <= 0 ? 160 : v;
  }

  @Input() level: number = 1;
  @Input() gap: number = 4; // in px
  @Input() animation: 'fadeAnimation' | 'spinAnimation' | 'scaleAnimation' | 'vortexAnimation' | 'disabled' = 'fadeAnimation';

  protected _size: number = 160;

  protected imageSource?: string = defaultImage;

  protected delay = Math.floor(Math.random() * 2500 + 300);

  imageService: ImageService = inject(ImageService);

  ngOnChanges() {
    if (this.visible) {
      this.imageSource = this.imagePaths[this.imageService.getUniqueRandomIndex(this.imagePaths.length)];
    }
  }

  getSizeAsCssStyle(): string {
    return `width: ${this.calcHeightOrWidth()}px; ` +
      `height: ${this.calcHeightOrWidth()}px`;
  }

  private calcHeightOrWidth(): number {
    let val = this._size;

    if (this.level <= 1) {
      return val;
    }

    for (let index = 1; index < this.level; index++) {
      val = (val / 2) - (this.gap / 2);
    }
    return val;
  }

}
