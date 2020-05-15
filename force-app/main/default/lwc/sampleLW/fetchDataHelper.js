import { LightningElement } from 'lwc';

export default class DualListboxSimple extends LightningElement {
    _selected = [];

    get options() {
        return [
            { label: 'John', value: 'en' },
            { label: 'Tim', value: 'de' },
            { label: 'Greg', value: 'es' },
            { label: 'Wick', value: 'fr' },
            { label: 'Tim', value: 'it' },
            { label: 'Galle', value: 'ja' },
        ];
    }

    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    handleChange(e) {
        this._selected = e.detail.value;
    }
}
