import { Pipe, PipeTransform } from '@angular/core';
import {Post} from '../types/post.type';
import {PageArgsType} from '../types/pageArgs.type';

@Pipe({
  name: 'paging',
  pure: false,
})
export class PagingPipe implements PipeTransform {

  transform(items: Post[], args?: PageArgsType): any {

    return items.slice((args.currentPage - 1) * args.perPage, args.currentPage * args.perPage);
  }

}
