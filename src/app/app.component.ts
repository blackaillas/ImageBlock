import { Component, HostListener } from '@angular/core';
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
    q1: true,
    q2: {
      q1: true, q2: true, q3: true, q4: true
    }, q3: {
      q1: true, q2: true, q3: {
        q1: true, q2: true, q3: true, q4: true
      }, q4: true
    }, q4: {
      q1: true, q2: true, q3: true, q4: {
        q1: true, q2: true, q3: true, q4: {
          q1: true, q2: true, q3: true, q4: {
            q1: true, q2: true, q3: true, q4: true
          }
        }
      }
    }
  };

  imagePaths1 = [
    './assets/female_1.png',
    './assets/female_2.png',
    './assets/female_3.png',
    './assets/female_4.png',
    './assets/female_5.png',
    './assets/female_6.png',
    './assets/female_7.png',
    './assets/female_8.png',
    './assets/male_1.png',
    './assets/male_2.png',
    './assets/male_3.png',
    './assets/male_4.png',
  ];
  imagePaths2 = [
    './assets/male_1.png',
    './assets/male_2.png',
    './assets/male_3.png',
    './assets/male_4.png',
  ];
  images?: string[] = this.imagePaths1;

  screenSize: string = 'Large screen';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setResponsiveSize(event);
  }
  ngOnInit() {
    this.setResponsiveSize(undefined);
    // setInterval(() => {
    //   this.images = this.images!.length > 5 ? this.imagePaths2 : this.imagePaths1;
    //   // this.setting = {q1: {q1: {q1: true, q2:true, q3: false, q4: false}, q2: true, q3: true, q4: true},q2:true, q3:true, q4:true};
    // }, 12000);
  }

  private setResponsiveSize(event?: Event) {
    const width = event ? (event.target as Window).innerWidth : window.innerWidth;

    if (width < 576) {
      this.screenSize = 'Small screen';
    } else if (width >= 576 && width < 992) {
      this.screenSize = 'Medium screen';
    } else {
      this.screenSize = 'Large screen';
    }
  }
}


