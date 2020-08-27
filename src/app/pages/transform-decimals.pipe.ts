import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDecimals'
})
export class TransformDecimalsPipe implements PipeTransform {

  transform(value: number): string {
    if(value == 0) return 'Free';
    if(value > 0 && value <= 0.25) return 'Low';
    if(value > 0.25 && value <= 0.50) return 'Moderate';
    if(value > 0.50 && value <= 0.75) return 'May cost a little bit';
    if(value > 0.75 && value <= 1) return 'Could be expensive';
  }

}
