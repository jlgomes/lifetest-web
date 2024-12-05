import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss'],
})
export class DetailedViewComponent implements OnInit {
  label?: string;
  datasetLabel?: string;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      this.label = params['label'];
      this.datasetLabel = params['datasetLabel'];
    });
  }
}
