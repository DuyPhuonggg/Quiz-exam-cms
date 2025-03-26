import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
    private _title: string = '';
    private _saveContent: string = 'Save';
    private _cancelContent: string = 'Cancel';
    private _fullWidth: boolean = false;
    private _loading: boolean = false;

    @Output() onClose = new EventEmitter<void>();
    @Output() onSave = new EventEmitter<void>();
    @Output() activeChange = new EventEmitter<boolean>();
    @Output() subtitleChange = new EventEmitter<string | null | undefined>();

    @Input() active: boolean = false;
    @Input() subtitle: string | null | undefined = '';

    @Input()
    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value;
    }

    @Input()
    get fullWidth(): boolean {
        return this._fullWidth;
    }
    set fullWidth(value: boolean) {
        this._fullWidth = value;
    }

    @Input()
    get loading(): boolean {
        return this._loading;
    }
    set loading(value: boolean) {
        this._loading = value;
    }

    @Input()
    get saveContent(): string {
        return this._saveContent;
    }
    set saveContent(value: string) {
        this._saveContent = value;
    }
    @Input()
    get cancelContent(): string {
        return this._cancelContent;
    }
    set cancelContent(value: string) {
        this._cancelContent = value;
    }

    constructor() {}

    handleCancel() {
        this.active = false;
        this.subtitle = '';
        this.activeChange.emit(this.active);
        this.subtitleChange.emit(this.subtitle);
    }

    handleSave() {
        this.onSave.emit();
    }
}
