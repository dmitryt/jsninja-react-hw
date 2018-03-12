import React, { Component } from 'react';

import Autocomplete from './components/Autocomplete';

import './App.css';

class App extends Component {
  render() {
    const items = [
      { value: 'some value', label: 'some label' },
      { value: 'some value2', label: 'some label2' },
      { value: 'some value3', label: 'some label3' },
    ];
    const getItems = text => {
      const result = items.filter(i => i.label.includes(text));
      return Promise.resolve(result);
    };
    const onChange = (v) => console.log('selected', v);
    return (
      <div className="App">
        <Autocomplete getItems={getItems} onChange={onChange} />
      </div>
    );
  }
}

export default App;
