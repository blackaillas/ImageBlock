import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ImageQuadComponent, Layout } from '../../projects/image-quad/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ImageQuadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ImageBlock';
  setting1?: Layout = {
    q1: true, q2: true, q3: false, q4: false
  };
  setting2?: Layout = {
    q1: false, q2: true, q3: true, q4: false
  };
  setting?: Layout = {
    q1:
    {
      q1: true,
      q2: true, q3: true, q4: true
    },
    q2: true, q3: true, q4: false
  };

  imagePaths1 = [
    './assets/female_1.png',
    './assets/female_2.png',
    './assets/female_3.png',
    './assets/female_4.png',
    './assets/female_5.png',
    './assets/female_6.png'
  ];
  imagePaths2 = [
    './assets/male_1.png',
    './assets/male_2.png',
    './assets/male_3.png',
  ];
  images?: string[] = this.imagePaths1;

  ngOnInit() {
    setInterval(() => {
      // this.images = Math.random() > 0.5 ? this.imagePaths2 : this.imagePaths1;
      // this.setting = {q1: {q1: {q1: true, q2:true, q3: false, q4: false}, q2: true, q3: true, q4: true},q2:true, q3:true, q4:true};
    }, 10000);
  }
}
