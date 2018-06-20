import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editPost'
})
export class EditPostPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
