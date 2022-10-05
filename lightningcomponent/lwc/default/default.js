import {LightningElement, api, wire} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {showToast, isEmpty} from 'c/afsUtils';

const DEFAULT_CLASSES = '<%= pascalCaseComponentName.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-')
.toLowerCase()%>';

export default class <%= pascalCaseComponentName %> extends NavigationMixin(LightningElement) {
	// Private properties
	_customClasses = DEFAULT_CLASSES;
	_cssVariables = {};

	// Private reactive properties

	// Public properties
	@api get customClasses(){
		return this._customClasses;
	}
	set customClasses(value){
		this._customClasses += value ? ` ${value}` : '';
	}
	connectedCallback(){
		this.classList.add(...this.customClasses.split(' '));
	}
	renderedCallback(){
		const component = this.template.firstChild;
		for (const cssVariable in this._cssVariables) {
			if (Object.prototype.hasOwnProperty.call(this._cssVariables, cssVariable)) {
				component.style.setProperty(cssVariable, this._cssVariables[cssVariable]);
			}
		}
	}
}
