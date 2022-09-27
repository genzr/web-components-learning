class Tooltip extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        this._tooltipContainer;
        this._tooltipText = 'Some dummy tooltip text';

        // Attach a shadow root to the element.
        this.attachShadow({mode: 'open'});

        /* 
        Creating a template directly in the js file by setting innerHTML
        Shadow DOM styles are not applied to other elements outside of the shadow DOM 
        */
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                }
            </style>
            <slot>Some default</slot>
            <span> (?)</span>
            `;
    }

    connectedCallback() {

        // This is how we get access to the attributes of the custom element
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }
    
}

customElements.define('uc-tooltip', Tooltip);