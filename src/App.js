import React, { Component } from 'react';

import Autocomplete from './components/Autocomplete';
import CryptoCurrencyChart from './components/CryptoCurrencyChart';

import './App.css';

class App extends Component {
  state = {
    values: [9874.24, 9651.12, 9650.23, 9532.12, 9412.21, 8999.23, 8712.23, 9912.32, 10133.23, 9712.22],
  }
  componentDidMount() {
    console.log(this.state.values);
    setInterval(() => {
      const { values } = this.state;
      const generate = () => 9000 + parseFloat(Math.random() * 500, 10);
      this.setState({ values: values.concat([generate()]) });
    }, 1000);
  }
  render() {
    const { values } = this.state;
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
        <CryptoCurrencyChart
          currency="BTC"
          values={values}
          maxChartValues={10}
        />
      </div>
    );
  }
}

export default App;
