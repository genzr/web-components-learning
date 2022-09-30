import { Component, h, State, Element, Prop, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
  tag: "uc-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true
})
export class StockPrice {

  @Element() el: HTMLElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({mutable:true, reflect:true}) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice();
    }
  }

  componentDidLoad() {
    console.log("componentDidLoad");
    if(this.stockSymbol) {
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice();
    }
  }

  componentWillLoad() {
    console.log("componentWillLoad");
    console.log(this.stockSymbol);
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  @Listen('ucSymbolSelected', {target: 'body'})
  onStockSymbolSelected(event : CustomEvent) {
    if(event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  fetchStockPrice() {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.stockUserInput}&apikey=${AV_API_KEY}`)
    .then(res => {
      return res.json();
    })
    .then(parsedRes => {

      if(!parsedRes['Global Quote']['05. price']) {
        this.fetchedPrice = null;
        throw new Error('Invalid symbol!');
      }
      this.error = null;
      this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      this.loading = false;
    })
    .catch( err => {
      this.error = err.message;
      this.fetchedPrice = null;
      this.loading = false;
    });
  }

  hostData() {
    return {class: this.error ? 'error hydrated' : ''};
  }

  onUserInput(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.stockUserInput = value;

    if (value.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
      this.fetchedPrice = null;
      this.error = null;
    }

  }

  onFetchStockPrice(event : Event) {
    event.preventDefault();
    this.stockSymbol = this.stockUserInput;
  }

  render () {

    let dataContent = <p>Please enter a symbol</p>;

    if(this.error) {
      dataContent = <p>{this.error}</p>
    }

    if (this.fetchedPrice) {
      dataContent = <p>Price: {this.fetchedPrice}</p>
    }

    if (this.loading) {
      dataContent = <uc-spinner></uc-spinner>
    }

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" value={this.stockUserInput} onInput={this.onUserInput.bind(this)}/>
        <button disabled={!this.stockInputValid || this.loading} type="submit">Fetch</button>
      </form>,
      <div>
        {dataContent}
      </div>
    ];
  }

}
