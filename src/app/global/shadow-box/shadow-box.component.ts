import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shadow-box',
  templateUrl: './shadow-box.component.html',
  styleUrls: ['./shadow-box.component.scss']
})
export class ShadowBoxComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
