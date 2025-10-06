import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.5/index.js?module';

export class CounterApp extends LitElement {
  // Define the properties
  static get properties() {
    return {
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true }
    };
  }

  constructor() {
    super();
    // Initial default values
    this.counter = 0;
    this.min = 0;
    this.max = 10;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block; /* sit inline but keep block layout */
        text-align: center; /* center text inside */
        padding: 16px; /* inner spacing */
        border: 2px solid #333; /* visible border for demo */
        border-radius: 12px; /* rounded corners */
        background-color: #fff; /* white background */
        margin: 12px; /* outer spacing */
      }

      #confetti {
        /* wrapper for confetti */
        display: block;
        position: relative;
      }

      .number {
        font-size: 48px; /* larger Number */
        font-weight: bold; /* bold weight */
        margin-bottom: 16px; /* space below the number */
        color: black; /* default color */
      }

      button {
        font-size: 20px; /* readable size */
        margin: 0 8px; /* spacing between buttons */
        padding: 8px 16px; /* clickable area */
        cursor: pointer; /* pointer on hover */
        border-radius: 8px; /* rounded buttons */
        border: 2px solid #333; /* button border */
        background-color: #dbeafe; /* light blue background */
      }

      button:hover {
        background-color: #93c5fd; /* background color of the button when hovered over */
      }

      button:focus {
        outline: 3px solid purple;
      }

      button:disabled {
        background-color: #f1f5f9;
        color: gray;
        cursor: not-allowed;
      }

      .minColor { color: red; }   /* when at minimum */
      .maxColor { color: green; } /* when at maximum */
      .color18 { color: purple; } /* when value is 18 */
      .color21 { color: orange; } /* when value is 21 */
    `;
  }

  firstUpdated() {
    // Convert attribute values to numbers so comparisons work reliably
    this.counter = Number(this.counter);
    this.min = Number(this.min);
    this.max = Number(this.max);
  }

  increase() {
    // Increase the counter by 1, but don't exceed max
    if (this.counter < this.max) {
      this.counter = Number(this.counter) + 1;
      this.requestUpdate();
    }
  }

  decrease() {
    // Decrease the counter by 1, but don't go below min
    if (this.counter > this.min) {
      this.counter = Number(this.counter) - 1;
      this.requestUpdate();
    }
  }

  updated(changedProperties) {
    if (super.updated) super.updated(changedProperties);
    if (changedProperties.has('counter')) {
      const prev = changedProperties.get('counter');
      // When the counter changes to 21 (and it wasn't 21 before), run confetti
      if (this.counter === 21 && prev !== 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    // Try to dynamically import the confetti module
    const tryImport = () => import('@haxtheweb/multiple-choice/lib/confetti-container.js');
    const cdnImport = () => import('https://unpkg.com/@haxtheweb/multiple-choice/lib/confetti-container.js?module');

    tryImport()
      .catch(() => cdnImport())
      .then(() => {
        setTimeout(() => {
          const confetti = this.shadowRoot && this.shadowRoot.querySelector('#confetti');
          if (confetti) confetti.setAttribute('popped', '');
        }, 0);
      })
      .catch((err) => {
        console.warn('Confetti import failed, falling back to flash', err);
        this._flash();
      });
  }

  _flash() {
    // Small visual fallback: temporarily scale the number so the user notices
    const el = this.shadowRoot && this.shadowRoot.querySelector('.number');
    if (!el) return;
    el.style.transition = 'transform 0.12s ease, color 0.2s ease';
    el.style.transform = 'scale(1.18)';
    setTimeout(() => {
      el.style.transform = '';
    }, 160);
  }

  render() {
    // render() returns the HTML template for the component
    // Convert properties to numbers for comparisons and rendering
    const current = Number(this.counter);
    const min = Number(this.min);
    const max = Number(this.max);

    // priority: special numbers (21, 18) should override min/max coloring
    let colorClass = '';
    if (current === 21) {
      colorClass = 'color21';
    } else if (current === 18) {
      colorClass = 'color18';
    } else if (current === min) {
      colorClass = 'minColor';
    } else if (current === max) {
      colorClass = 'maxColor';
    }

    // The HTML template: a confetti wrapper, the large number, buttons, and min/max text
    return html`
      <confetti-container id="confetti">
        <div class="number ${colorClass}">${current}</div>
        <div>
          <!-- Decrement button (disabled at min) -->
          <button @click="${this.decrease}" ?disabled="${current === min}">-</button>
          <!-- Increment button (disabled at max) -->
          <button @click="${this.increase}" ?disabled="${current === max}">+</button>
        </div>
        <!-- Small line showing min and max values for the component -->
        <div style="font-size:14px;margin-top:8px;">min: ${min}  max: ${max}</div>
      </confetti-container>
    `;
  }
}

customElements.define('counter-app', CounterApp);

