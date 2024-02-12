import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  static usedIndexes: number[] = [];

  resetUsedIndexes(): void {
    ImageService.usedIndexes = [];
  }

  getUniqueRandomIndex(max: number): number {
    let index: number = 0;
    do {
      index = Math.floor(Math.random() * max);
    } while (ImageService.usedIndexes.includes(index) && ImageService.usedIndexes.length < max);
    ImageService.usedIndexes.push(index);
    console.log(ImageService.usedIndexes, max);
    return index;
  }

}
