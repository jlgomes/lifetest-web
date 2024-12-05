import { checkAccessCode } from '@core/infra/utils/check-Access-code';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SlotModel } from "@core/domain/models/slot-model";
import { ProductModel } from "@core/domain/models/product-model";
import { SlotWebSocketService } from "@core/domain/services/slot-web-socket.service";
import { MatDialogConfig } from '@angular/material/dialog';
import { SlotComponent } from '../components/slot/slot.component';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { TestService } from '@core/domain/services/test.service';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { Router } from '@angular/router';
import { testsRoutes } from '@helpers/constants/path-rest-constants';

type rackActiveType = "Rack1" | "Rack2";

interface IRack {
    count: number,
    product?: ProductModel
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    private slotWebSocketService?: SlotWebSocketService;
    protected readonly checkAccessCode = checkAccessCode;

    protected rackActive: rackActiveType = "Rack1";
    protected towers = ['A', 'B', 'C', 'D'];
    protected mockTemperature = [39, 41, 42, 40];
    protected box: SlotModel[][][] = [];
    protected modelsRack1: IRack[] = [];
    protected modelsRack2: IRack[] = [];
    protected disabledStart: boolean = true;
    protected initializing: boolean = false;
    protected startedsByModal: Set<string> = new Set();

    constructor(
        public dialog: MatDialog,
        private _translate: TranslateService,
        private titleService: Title,
        private _testService: TestService,
        private _toastService: ToastService,
        private _router: Router,
      ) {
        const pageTitle = _translate.instant("page-title.control-panel");
        this.titleService.setTitle(pageTitle);
    }

    ngOnInit(): void {
        this.slotWebSocketService = new SlotWebSocketService(
            this.view.bind(this)
        );
    }

    ngOnDestroy(): void {
        this.slotWebSocketService?.stop();
    }

    public view(data: SlotModel[]): void {
        this.clearBox();
        this.hasNoInitialized(data);

        const box1: SlotModel[] = [];
        const box2: SlotModel[] = [];
        const box3: SlotModel[] = [];
        const box4: SlotModel[] = [];
        const box5: SlotModel[] = [];
        const box6: SlotModel[] = [];
        const box7: SlotModel[] = [];
        const box8: SlotModel[] = [];

        data.forEach(item => {
            const num = Number(item.name) - 1;
            const position = item.rack.name;
            if (position === "01") {
                if (num <= 11) {
                    box1.push(item);
                } else if (num <= 23) {
                    box2.push(item);
                } else if (num <= 35) {
                    box3.push(item);
                } else if (num <= 47) {
                    box4.push(item);
                }
            } else if (position === "02") {
                if (num <= 11) {
                    box5.push(item);
                } else if (num <= 23) {
                    box6.push(item);
                } else if (num <= 35) {
                    box7.push(item);
                } else if (num <= 47) {
                    box8.push(item);
                }
            }

            if (position === "01") {
                this.calcRack(this.modelsRack1, item);
            } else {
                this.calcRack(this.modelsRack2, item);
            }
        });

        const rack1 = [box1, box2, box3, box4];
        const rack2 = [box5, box6, box7, box8];

        this.box.push(rack1, rack2);
    }

    private calcRack(data: IRack[], item: SlotModel): void {
        if ((data.filter(x => x.product?.model === item.test?.product?.model)).length == 0) {
            data.push({ product: item.test?.product, count: 1 });
        } else {
            data.forEach((valorAtual) => {
                if (valorAtual.product?.model == item.test?.product.model) {
                    valorAtual.count += 1;
                }
            });
        }
    }

    private clearBox(): void {
        this.box = [];
        this.modelsRack1 = [];
        this.modelsRack2 = [];
    }

    protected changeRack(rack: rackActiveType): void {
        this.rackActive = rack;
    }

    protected viewSlot(item: SlotModel): void {
        if (item.inMaintenance && !item.test) return;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.enterAnimationDuration = '150ms';
        dialogConfig.exitAnimationDuration = '150ms';
        dialogConfig.width = '550px';
        dialogConfig.data = item;
        const dialogRef = this.dialog.open(SlotComponent, dialogConfig);
        dialogRef.componentInstance.onStartTest.subscribe(test => this.startedsByModal.add(test));
    }

    protected startTests(): void {
        this.disabledStart = true;
        this.initializing = true;
        this._testService.initialize().subscribe(() => {
            const toastsMessage = this._translate.instant("toasts.starting-test");
            this._toastService.show(toastsMessage, TypeToastEnum.INFO);
        });
    }

    protected hasNoInitialized(data: SlotModel[]) {
        this.initializing = false;
        this.startedsByModal.clear();
        if (data.some(item => item.status === true && item.test?.startDate === null)) {
            this.disabledStart = false;
        } else {
            this.disabledStart = true;
        }
    }

    protected hasHadErrors(slot: SlotModel): boolean {
        return Boolean(
            slot.test?.lastLedError || slot.test?.lastPingError
        );
    }

    protected hasErrorLastLedTelemetry(slot: SlotModel): boolean | undefined {
        return slot.test?.lastLedTelemetry?.led2G
            && slot.test?.lastLedTelemetry?.led5G
            && slot.test?.lastLedTelemetry?.ledPower;
    }

    protected hasErrorLastPingTelemetry(slot: SlotModel): boolean | undefined {
        return slot.test?.lastPingTelemetry?.pingP1
            && slot.test?.lastPingTelemetry?.pingP2
            && slot.test?.lastPingTelemetry?.pingP3
            && slot.test?.lastPingTelemetry?.pingP4;
    }

    protected navigateToTestRegistration() {
      this._router.navigate([testsRoutes.TEST_REGISTRATION]);
    }

}
