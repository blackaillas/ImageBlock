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
`selector: lib-imageQuad`

### @Inputs()

| Input            | Type    | Required                   | Description                                                                                               |
| ---------------- | ------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| apiURL           | string  | **YES**                    | the url of a remote server that supports http/jsonp calls.                                                |
| delayTime        | number  | Optional, default: 300     | the debounce time for this request.                                                                       |
| urlParams        | object  | Optional, default: {}      | { key: string, value: any} object as additional parameters                                                |
| urlQueryParam    | string  | Optional, default: 'query' | a string value which is used a query parameter in the url. Ex: `http://localhost:3000/countries?query='c` |
| apiMethod        | string  | Optional, default: 'get'   | the http/jsonp method to be used.                                                                         |
| apiType          | string  | Optional, default: 'http'  | http or jsonp method types.                                                                               |
| callbackFuncName | string  | Optional                   | a string value for the callback query parameter.                                                          |
| allowEmptyString | boolean | Optional, default: true    | if true, it allows empty strings to pass and invoke search                                                |

### @Outputs()

| Output           | Type       | Required | Description                                            |
| ---------------- | ---------- | -------- | ------------------------------------------------------ |
| filteredDataList | Array<any> | **YES**  | emits filtered data list depending on the search term. |

## Usage

1) Register the `NgxMatTypeaheadModule` in your app module.
 > `import { NgxMatTypeaheadModule } from 'ngx-mat-typeahead'`

 ```typescript
 import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatTypeaheadModule } from 'ngx-mat-typeahead';
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
    NgxMatTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
 ```

 2) Use the directive `(NgxMatTypeahead)` in your component.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
@Component({
  selector: 'mat-ta-root',
  template: `<h3>NgxMatTypeahead demo app using Angular Material</h3>
<div [formGroup]="testFormGroup">
  <mat-form-field>
    <input matInput NgxMatTypeahead [apiURL]="url" [urlQueryParam]="queryParam" (filteredDataList)="getFilteredSuggestions($event)"
      formControlName="country" [matAutocomplete]="countryAuto" placeholder="Choose Country">
    <mat-autocomplete #countryAuto="matAutocomplete">
      <mat-option *ngFor="let country of countries" [value]="country">
        {{country}}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>
</div>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Paramteres for the input type are defined below. The url is generated using `json-server`.
  // Please run your own instance of the json-server to use the the below url.
  queryParam = 'q';
  url = 'http://localhost:3000/countries';

  constructor(private appService: AppService) {}

  testFormGroup: FormGroup = new FormGroup({ country: new FormControl('') });
  countries: Array<string> = [];

  ngOnInit() {
    this.countries = ["United States", "United Kingdom", "China", "Japan", "India", "Russia", "Canada", "Brazil"];
  }

  getFilteredSuggestions(filteredDataLst: Array<any>) {
    this.countries = [...filteredDataLst];
  }
}
```

## Running the example in local env

* use node version 20 or higher
* `npm i`
* Run `ng serve` for a dev server and running the demo app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build the ImageBlock module

Run `ng build ImageBlock` to build the library. The build artifacts will be stored in the `dist/image-quad` directory. Use the `--prod` flag for a production build.

## Running unit tests TBD

Run `ng test ImageBlock` to execute the unit tests via [Karma](https://karma-runner.github.io).

