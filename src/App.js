import React, { Component } from 'react';

import Autocomplete from './components/Autocomplete';
import CryptoCurrencyChart from './components/CryptoCurrencyChart';

import './App.css';

class App extends Component {
  render() {
    const items = [
      { value: 'robertdeniro', label: 'Robert De Niro' },
      { value: 'tomhanks', label: 'Tom Hanks' },
      { value: 'russellcrowe', label: 'Russell Crowe' },
    ];
    const getItems = text => {
      const result = items.filter(i => i.label.startsWith(text));
      return Promise.resolve(result);
    };
    const onChange = (v) => console.log('selected', v);
    return (
      <div className="App">
        <Autocomplete getItems={getItems} onChange={onChange} />
        <br/>
        <CryptoCurrencyChart
          url="ws://coins-stream.demo.javascript.ninja"
          currency="BTC"
          maxChartValues={20}
        />
      </div>
    );
  }
}

export default App;
