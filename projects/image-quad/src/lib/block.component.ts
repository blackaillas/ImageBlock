import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
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
    ])
  ]
})
export class BlockComponent {
  @Input({ required: true }) imagePaths: string[] = [];
  @Input() visible: boolean = true;
  @Input()
  set size(v: number) { // in px
    this._size = v > this.gap * 2 ? v : 160;
  }

  @Input() level: number = 1;
  @Input() gap: number = 4; // in px
  @Input() animation: 'fadeAnimation' | 'spinAnimation' | 'disabled' = 'fadeAnimation';

  protected _size: number = 160;

  protected imageSource?: string = defaultImage;

  protected delay = Math.floor(Math.random() * 2500 + 300);

  imageService: ImageService = inject(ImageService);

  ngOnInit(): void {
    if (this.visible) {
      this.imageSource = this.imagePaths[this.imageService.getUniqueRandomIndex(this.imagePaths.length)];
    }
  }

  // getSizeAsCssStyle(): string {
  //   return `width: calc(${this._size / (Math.pow(2, this.level - 1))}px - ${(this.level <= 1) ? 0 : ((this.gap / 2) * (this.level - 1))}px); ` +
  //          `height: calc(${this._size / (Math.pow(2, this.level - 1))}px - ${(this.level <= 1) ? 0 : ((this.gap / 2) * (this.level - 1))}px)`;
  // }

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
