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
    console.debug('max', max);
    let index: number = 0;
    do {
      index = Math.floor(Math.random() * max);
    } while (ImageService.usedIndexes.includes(index) && ImageService.usedIndexes.length < max);
    ImageService.usedIndexes.push(index);
    console.debug('usedIndexes', ImageService.usedIndexes);
    return index;
  }

}
