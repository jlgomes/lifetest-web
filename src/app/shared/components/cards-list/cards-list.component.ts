import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})

export class CardsListComponent {
  @Input() itens: any[] = [];
  protected rippleColor: string = "rgba(230, 250, 255, 0.1)";

  constructor() { }

}
