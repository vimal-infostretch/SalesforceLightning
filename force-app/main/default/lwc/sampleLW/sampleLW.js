import { LightningElement } from 'lwc';

export default class SampleLW extends LightningElement {
    greeting = 'Welcome to World of Salesforce';
    changeHandler(event) {
      this.greeting = event.target.value;
    }
}