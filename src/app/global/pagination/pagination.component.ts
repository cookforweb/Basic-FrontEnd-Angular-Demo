import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PageArgsType} from '../../types/pageArgs.type';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() args: PageArgsType;
  @Output() setPage = new EventEmitter();

  pages: number[];

  constructor() { }

  ngOnInit() {

    // Construct an array for each page
    // @ts-ignore
    this.pages = Array(this.args.pagesTotal).fill().map((x, i) => i + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  pageClicked(page) {
    this.setPage.emit(page);
  }

  prevPage() {
    if (this.args.currentPage > 1){
      this.args.currentPage--;
    }
  }

  nextPage() {
    if (this.args.currentPage < this.args.pagesTotal){
      this.args.currentPage++;
    }
  }

}
