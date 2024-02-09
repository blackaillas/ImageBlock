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
    trigger('simpleFadeAnimation', [
      transition('*=>*', [
        style({ opacity: 0 }),
        animate('{{ delay }}ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class BlockComponent {
  @Input({ required: true }) imagePaths: string[] = [];
  @Input() visible: boolean = true;
  @Input() size: number = 160; // in px
  @Input() level: number = 1;
  @Input() gap: number = 4; // in px

  protected imageSource?: string = defaultImage;

  protected delay = Math.floor(Math.random() * 2500 + 300);

  imageService: ImageService = inject(ImageService);

  ngOnInit(): void {
    if (this.visible) {
      this.imageSource = this.imagePaths[this.imageService.getUniqueRandomIndex(this.imagePaths.length)];
    }
  }

  getSizeAsCssStyle(): string {
    return `width: calc(${this.size / (Math.pow(2, this.level - 1))}px - ${(this.level <= 1) ? 0 : (this.gap / 2)}px); height: calc(${this.size / (Math.pow(2, this.level - 1))}px - ${(this.level <= 1) ? 0 : (this.gap / 2)}px)`;
  }

}
