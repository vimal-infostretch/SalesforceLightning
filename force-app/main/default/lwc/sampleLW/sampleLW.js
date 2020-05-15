import { LightningElement } from 'lwc';

export default class SampleLW extends LightningElement {
    greeting = 'Results:';
    changeHandler(event) {
      this.greeting = event.target.value;
    }
}