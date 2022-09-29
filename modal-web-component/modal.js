class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>

                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.75);
                    z-index: 10;
                }

                header {
                    padding: 1rem;
                }

                ::slotted(h1) {
                    font-size: 1.25rem;
                }

                #modal {
                    z-index: 100;
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    background-color: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button {
                    margin: 0 0.25rem;
                }

                #main {
                    padding: 1rem;
                }

            </style>

            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title"></slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancel-btn">Cancel</button>
                    <button id="confirm-btn">Okay</button>
                </section>
            </div>
            `
        this._isVisible = false;    

        const slots = this.shadowRoot.querySelectorAll('slot');
        
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes());
        });
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#backdrop').addEventListener('click', this._cancel.bind(this));
        this.shadowRoot.querySelector('#cancel-btn').addEventListener('click', this._cancel.bind(this));
        this.shadowRoot.querySelector('#confirm-btn').addEventListener('click', this._confirm.bind(this));
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === newValue) {
            return;
        }
        if(name === 'opened') {
            if(this.hasAttribute('opened')) {
                this._isVisible = true;
            } else {
                this._isVisible = false;
            }
            this._render();
        }
    }

    static get observedAttributes() {
        return ['opened'];
    }

    _cancel(event) {
        this._isVisible = false;
        this.removeAttribute('opened');
        const cancelEvent = new Event('cancel', {bubbles: true, composed: true});
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm() {
        this._isVisible = false;
        this.removeAttribute('opened');
        const confirmEvent = new Event('confirm');
        this.dispatchEvent(confirmEvent);
    }

    _render() {
        this._isVisible ? this.shadowRoot.querySelector('#backdrop').style.display = 'block' : this.shadowRoot.querySelector('#backdrop').style.display = 'none';
        this._isVisible ? this.shadowRoot.querySelector('#modal').style.display = 'block' : this.shadowRoot.querySelector('#modal').style.display = 'none';
    }

}

customElements.define('uc-modal', Modal);