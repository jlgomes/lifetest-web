import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modem',
  templateUrl: './modem.component.html',
  styleUrls: ['./modem.component.scss']
})
export class ModemComponent implements OnInit {
  @Input() cardNumber?: string = "";
  @Input() modemID: string = "";
  @Input() modelColor?: string = "";
  @Input() errors: boolean = false;
  @Input() ledStatus?: boolean;
  @Input() pingStatus?: boolean;
  @Input() enabled: boolean = false;
  @Input() initialized: boolean = false;
  @Input() initializing: boolean = false;
  @Input() inMaintenance: boolean = false;
  @Output() click = new EventEmitter();

  statusBar: string = "default";


  ngOnInit(): void {
    if (!this.initialized) {
      this.statusBar = "waiting"
    }
    if (this.initialized && this.errors) {
      this.statusBar = "danger"
    }

    if (this.initialized && !this.errors && this.enabled) {
      this.statusBar = "success"
    }
  }

}
