import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    return items.filter(item => Object.keys(item).some(key =>
      item[key] &&
      item[key].toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    );
  }
}