import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FontWeight,
    ButtonVariantType,
    FontSize,
    ButtonTone,
} from '@/app/types';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnChanges {
    private _fontWeight: FontWeight = 'regular';
    private _fontSize: FontSize = 'xs';
    private _variant: ButtonVariantType = 'primary';
    private _bgColor: ButtonTone = 'lilac';
    private _title: string = 'button';
    private _boxShadow: boolean = false;
    private _disable: boolean = false;

    @Output() onClick = new EventEmitter<void>();

    @Input()
    get fontWeight(): FontWeight {
        return this._fontWeight;
    }
    set fontWeight(value: FontWeight) {
        this._fontWeight = value;
    }

    @Input()
    get fontSize(): FontSize {
        return this._fontSize;
    }
    set fontSize(value: FontSize) {
        this._fontSize = value;
    }

    @Input()
    get variant(): ButtonVariantType {
        return this._variant;
    }
    set variant(value: ButtonVariantType) {
        this._variant = value;
    }

    @Input()
    get tone(): ButtonTone {
        return this._bgColor;
    }
    set tone(value: ButtonTone) {
        this._bgColor = value;
    }

    @Input()
    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value;
    }

    @Input()
    get boxShadow(): boolean {
        return this._boxShadow;
    }
    set boxShadow(value: boolean) {
        this._boxShadow = value;
    }

    @Input()
    get disabled(): boolean {
        return this._disable;
    }
    set disabled(value: boolean) {
        this._disable = value;
    }

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['title'] && changes['title'].currentValue) {
            this.title = changes['title'].currentValue;
        }

        if (changes['variant'] && changes['variant'].currentValue) {
            this.variant = changes['variant'].currentValue;
        }
    }

    handleClick() {
        this.onClick.emit();
    }
}
