import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ImageQuadComponent, Setting } from '../../projects/image-quad/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ImageQuadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ImageBlock';
  setting: Setting = {
    q1: true, q2: { q1: true, q2: true, q3: true, q4: true }, q3: true, q4: { q1: true, q2: true, q3: true, q4: true }
  };
}
