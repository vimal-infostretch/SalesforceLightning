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
            { label: 'John', value: 'John' },
            { label: 'Wisk', value: 'Wisk' },
            { label: 'Tim', value: 'Tim' },
            { label: 'Smith', value: 'Smith' },
            { label: 'Gale', value: 'Gale' },
            { label: 'Dave', value: 'Dave' },
        ];
    }

    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    handleChange(e) {
        this._selected = e.detail.value;
    }
}

