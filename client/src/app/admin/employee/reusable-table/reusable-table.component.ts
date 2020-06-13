import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss']
})
export class ReusableTableComponent implements OnInit {

  @Output("onAction") emitter = new EventEmitter<object>();
  @Input("data") dataSource = [];
  @Input("cols") tableCols = [];
  get keys() { return this.tableCols.map(({ key }) => key); }
  showBooleanValue(elt, column) {
    return column.config.values[`${elt[column.key]}`];
  }
  constructor() { }

  ngOnInit() {
  }

}
