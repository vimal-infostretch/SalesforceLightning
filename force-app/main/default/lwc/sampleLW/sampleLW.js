import { LightningElement } from 'lwc';

export default class SampleLW extends LightningElement {
    greeting = 'Results:';
    changeHandler(event) {
      this.greeting = event.target.value;
    }
    val = 85;

    _selected = [];

    get options() {
        return [
            { label: 'Acme Corporation', value: 'Acme corp' },
            { label: 'Globex Corporation', value: 'Globex Corp' },
            { label: 'Soylent Corporation', value: 'Soylent Corp' },
            { label: 'Initech LLC', value: 'Initech' },
            { label: 'Vehement Capital', value: 'Vehement Cap' },
            { label: 'Massive Dynamic LLC', value: 'Massive Dynamic LLC' },
        ];
    }

    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    handleChange(e) {
        this._selected = e.detail.value;
    }
}

