import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Toast } from '@/app/types';
import { TimeHelper } from '@/app/helpers';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnChanges {
    @Input() toast: Toast | any;

    during: number = 3000;
    animation: { active: string; current: string } = {
        active: 'animated zoomIn anim-300-duration v-enter-to',
        current: '',
    };
    constructor(private timeHelper: TimeHelper) {}

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['toast'] && changes['toast'].currentValue?.active) {
            await this.showToast();
        }
    }

    async showToast() {
        this.animation.current = this.animation.active;
        await this.timeHelper.sleep(
            this.toast?.timer ? this.toast?.timer : this.during
        );
        this.animation.current = '';
        if (this.toast?.active) {
            this.toast.active = false;
        }
    }
}
