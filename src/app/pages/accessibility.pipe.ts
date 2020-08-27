import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accessibility'
})
export class AccessibilityPipe implements PipeTransform {

  transform(value: number): number {

    value *= 100;
  
    let result: number = 100 - value;

    return result;
  }

}