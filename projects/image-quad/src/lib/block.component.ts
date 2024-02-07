import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  @Input() imageSource: string = './assets/male_1.png';

  getSizeAsCssStyle(): string {
    return `width: calc(${this.size / this.level}px - ${(this.level <= 1) ? 0 : (this.gap / 2)}px); height: calc(${this.size / this.level}px - ${(this.level <= 1) ? 0 : (this.gap / 2)}px)`;
  }

}
