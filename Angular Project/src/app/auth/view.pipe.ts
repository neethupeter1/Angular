import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'view'
})
export class ViewPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return args ? value.filter((item) => {
      if(item.title==args) {
        return item;
      }
    }): null;
  }

}
