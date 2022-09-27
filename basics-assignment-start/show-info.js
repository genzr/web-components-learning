class ShowInfo extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
            </style>
            <slot>
            </slot>
            `;
        this._infoText = 'This is default text if there is no info attribute present';
        this._showButton = document.createElement('button');
        this._isClicked = false;
    }

    // When the element is added to the DOM
    connectedCallback() {
        this._infoText = this.getAttribute('info');
        this._showButton.textContent = 'Show';
        this._showButton.addEventListener('click', this._toggleInfo.bind(this));
        this.shadowRoot.appendChild(this._showButton);
    }

    _toggleInfo() {
        if(this._isClicked) {
            this.shadowRoot.removeChild(this._infoContainer);
            this._isClicked = !this._isClicked;
            this._showButton.textContent = 'Show';
        } else {
            this._showButton.textContent = 'Hide';
            this._infoContainer = document.createElement('div');
            this._infoContainer.textContent = this._infoText;
            this.shadowRoot.appendChild(this._infoContainer);
            this._isClicked = !this._isClicked;
        }
    }

}

customElements.define('uc-show-info', ShowInfo);