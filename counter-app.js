import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {
  static get properties() {
    return {
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true }
    };
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 10;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        text-align: center;
        font-family: sans-serif;
        margin: 16px;
      }

      .value {
        font-size: 3rem;
        margin-bottom: 12px;
        transition: color 0.3s ease;
      }

      button {
        font-size: 1.5rem;
        margin: 0 8px;
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        background-color: var(--btn-bg, #eee);
        transition: background-color 0.2s ease;
      }

      button:hover:not(:disabled),
      button:focus:not(:disabled) {
        background-color: var(--btn-hover, #ccc);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Counter color changes */
      .value.min {
        color: blue;
      }
      .value.mid {
        color: orange;
      }
      .value.high {
        color: red;
      }
      .value.max {
        color: purple;
      }
    `;
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="value ${this._valueClass()}">${this.counter}</div>
        <div>
          <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
          <button @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
        </div>
      </confetti-container>
    `;
  }

  _valueClass() {
    if (this.counter === this.min) return 'min';
    if (this.counter === 18) return 'mid';
    if (this.counter === 21) return 'high';
    if (this.counter === this.max) return 'max';
    return '';
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  updated(changedProperties) {
    if (super.updated) super.updated(changedProperties);
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import('@haxtheweb/multiple-choice/lib/confetti-container.js').then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector('#confetti').setAttribute('popped', '');
      }, 0);
    });
  }
}

customElements.define('counter-app', CounterApp);
