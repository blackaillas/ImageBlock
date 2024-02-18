# ImageBlock

This library was created with the latest angular version and is tested against an Angular 17 app.

* A simple `component` to be used within Angular applications.
* This component display images in a grid with fashion.
* Several behaviour can be and suggested to be configured.
* It is developed using `Angular >=17.0.0` and its introduces features like standalone components, new template controls and recursive component hierarchy.
* Library location: `projects/image-quad` directory of this repository.

## Examples/Demo

* A simple Example can be found on Azure: https://proud-dune-0a9216403.4.azurestaticapps.net. 

## Installation of the library

The library is available as an npm package. To install the package run the following command:

`npm i image-quad`

## API

`import { ImageQuadComponent } from 'image-quad'`<br>
`selector: ngx-image-quad`

### @Inputs()

| Input            | Type    | Required                   | Description                                                                                               |
| ---------------- | ------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| mode           | Mode  | **YES**                    | Configure the behaviour of the layout with fixed predefined ones or with custom setups.  Also can use random layouts. Available values: 'random', 'fullRandom', 'fixedOne', 'fixedTwo', 'fixedThree', {q1:true, q2:false, q3:true, q4: {q1:true}}                      |
| imagePaths        | string[]  | **YES**     | The list of images that will be randomly selected. E.g.: ./assets/image.png */                                                                       |
| size        | number  | Optional, default: 160      | Size of level 1 image in pixel            |
| gap    | number  | Optional, default: 4 | Gap between the images in pixel |
| level        | number  | Optional, default: 1   | Do not set this parameter manually                     |
| animation        | string  | Optional, default: 'fadeAnimation'   | Choose from predefined animations or disable it. Valid Values: 'fadeAnimation', 'spinAnimation', 'scaleAnimation', 'vortexAnimation', 'disabled'      |


## Usage

Library provides 1 standalone component, which as other modules can be imported to your application in the usual ways.

1) Register the `ImageQuadComponent` in your app module.
 > `import { ImageQuadComponent } from 'image-quad';`

 ```typescript
 import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageQuadComponent } from 'image-quad';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    ImageQuadComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
 ```

 2) Use `(ImageQuadComponent)` in your component.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  template: `<h3>ImageQuad demo app</h3>
  <div>
    <ngx-image-quad [mode]="'random'" [imagePaths]="imagePaths" [size]="120" [gap]="2"></ngx-image-quad>
  </div>
`
})
export class AppComponent implements OnInit {
  imagePaths = ['./assets/image1.png','./assets/imageAB.png','./assets/image123.png'];

  constructor() {}

}
```

### Configs
As a minimum, you need to specify `mode` and `imagePaths`:
```
<ngx-image-quad [mode]="'random'" [imagePaths]="imagePaths"></ngx-image-quad>
```



For responsiveness you can detect screen size and set `size` parameter accordingly:
```
<ngx-image-quad [mode]="setting!" [imagePaths]="images!" [size]="screenSize == 'Small screen'? 60 : 200" [animation]="'spinAnimation'"></ngx-image-quad>
```
