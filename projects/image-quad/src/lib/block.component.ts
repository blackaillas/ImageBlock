import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

const defaultImage = 'data:image/png;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent {
  @Input() visible: boolean = true;
  @Input() size: number = 160; // in px
  @Input() level: number = 1;
  @Input() gap: number = 4; // in px
  @Input() set image(value: string | undefined | null) {
    this.imageSource = value ?? defaultImage;
  }
  imageSource?: string = defaultImage;



  getSizeAsCssStyle(): string {
    return `width: calc(${this.size / (Math.pow(2, this.level - 1))}px - ${(this.level <= 1) ? 0 : (this.gap / 2)}px); height: calc(${this.size / (Math.pow(2, this.level - 1))}px - ${(this.level <= 1) ? 0 : (this.gap / 2)}px)`;
  }

}
