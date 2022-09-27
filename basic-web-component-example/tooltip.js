class Tooltip extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        this._tooltipVisible;
        this._tooltipIcon;
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
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }

                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }

                :host(.important) {
                    background: var(--color-primary);
                    padding: 0.15rem;
                }

                :host-context(p) {
                    font-weight: bold;
                }

                .icon {
                    background: black;
                    color: white;
                    padding: 0.25rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }

            </style>
            <slot>Some default</slot>
            <span class="icon">?</span>
            `;
    }

    connectedCallback() {

        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(this._tooltipIcon);
        this.style.position = 'relative';

        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._tooltipText = newValue;
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    static get observedAttributes() {
        return ['text'];
    }

    _render() {
        if(this._tooltipVisible) {
            this._tooltipContainer = document.createElement('div');
            this._tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(this._tooltipContainer);
        } else {
            if(this._tooltipContainer) {
                this.shadowRoot.removeChild(this._tooltipContainer);
            }
        }

        // This is how we get access to the attributes of the custom element
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }
    
}

customElements.define('uc-tooltip', Tooltip);