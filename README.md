# ImageBlock

This library was created with the latest angular version and is tested against an Angular 17 app.

* A simple `component` to be used within Angular applications.
* This component display images in a grid with fashion.
* Several behaviour can be and suggested to be configured.
* It is developed using `Angular >=17.0.0` and its introduces features like standalone components, new template controls and css mix-blend-mode.
* Library location: `projects/image-quad` directory of this repository.

## Examples/Demo

* A simple Example can be found under `src/app` directory of this repository. 

## Installation of the library

The library is available as an npm package. To install the package run the following command:

`npm i image-quad`

## API

`import { ImageQuadComponent } from 'image-quad'`<br>
`selector: ngx-image-quad`

### @Inputs()

| Input            | Type    | Required                   | Description                                                                                               |
| ---------------- | ------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| mode           | Mode  | **YES**                    | Configure the behaviour of the layout with fixed predefined ones or with custom setups.  Also can use random layouts                                                |
| imagePaths        | string[]  | **YES**     | The list of images that will be randomly selected. E.g.: ./assets/image.png */                                                                       |
| size        | number  | Optional, default: 160      | Size of level 1 image in pixel            |
| gap    | number  | Optional, default: 4 | Gap between the images in pixel |
| level        | number  | Optional, default: 1   | Do not set this parameter manually                     |


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

## Running the example in local env

* use node version 20 or higher
* `npm i`
* Run `ng serve` for a dev server and running the demo app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build the ImageBlock module

Run `ng build ImageBlock` to build the library. The build artifacts will be stored in the `dist/image-quad` directory. Use the `--prod` flag for a production build.

