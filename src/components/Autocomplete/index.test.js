import React from 'react';
import { mount } from 'enzyme';

import WrappedComponent, { withValue, withFocusManagement } from './index';
import Autocomplete from './Autocomplete';

describe('Component Autocomplete', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const getItemsStub = value => () => Promise.resolve(value);
  const getInput = c => c.find('input');
  const getDropdown = c => c.find('.b-autocomplete-result');
  const getDropdownItems = c => c.find('.b-autocomplete-result__item');

  const setupComponent = (props, Component = WrappedComponent) => {
    return mount(<Component getItems={getItemsStub([])} {...props} />)
  };

  it('should renders correctly by default', () => {
    const component = setupComponent({ getItems: getItemsStub([]) });

    expect(getInput(component)).toHaveLength(1);
    expect(getDropdownItems(component)).toHaveLength(0);
  });

  it('should renders with provided value correctly', () => {
    const component = setupComponent({ value: '123' });
    const input = getInput(component);

    expect(input).toHaveLength(1);
    expect(input.instance().value).toBe('123');
    expect(getDropdownItems(component)).toHaveLength(0);
  });

  it('should update input value, when new value comes via props', () => {
    const component = setupComponent({ value: '123' });
    const input = getInput(component);

    expect(input.instance().value).toBe('123');
    component.setProps({ value: '234' });

    expect(input.instance().value).toBe('234');
  });

  describe('entering the value', () => {
    const Component = withValue(Autocomplete);

    it('should update input value correctly, when user enters value', () => {
      const component = setupComponent({}, Component);
      const input = getInput(component);

      input.simulate('change', { target: { value: '123' } });

      expect(input.instance().value).toBe('123');
    });

    it('should call callback, when user enters value', () => {
      const onChange = jest.fn();
      const component = setupComponent({ onChange }, Component);
      const input = getInput(component);

      input.simulate('change', { target: { value: '123' } });

      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0]).toEqual([null]);
    });

    it('should filter items, when user enters value', () => {
      const getItems = jest.fn().mockImplementation(() => Promise.resolve([]));
      const component = setupComponent({ getItems }, Component);
      const input = getInput(component);

      input.simulate('change', { target: { value: '12' } });

      expect(getItems.mock.calls.length).toBe(1);
      expect(getItems.mock.calls[0]).toEqual(['12']);
    });

    it('should render items, when user enters value', done => {
      const filteredItems = [
        { label: '123', value: '345' }
      ];
      const getItems = jest.fn().mockImplementation(() => Promise.resolve(filteredItems));
      const component = setupComponent({ getItems, isDropdownVisible: true }, Component);
      const input = getInput(component);

      expect(getDropdownItems(component)).toHaveLength(0);
      input.simulate('change', { target: { value: '12' } });

      setTimeout(() => {
        component.update();
        expect(getDropdownItems(component)).toHaveLength(1);
        done();
      }, 0);
    });
  });

  describe('selecting the value', () => {
    const Component = withValue(Autocomplete);
    const items = [
      { label: '123', value: '345' },
      { label: '567', value: '789' },
    ];

    it('should update input value correctly, when user selects value', () => {
      const component = setupComponent({ isDropdownVisible: true }, Component);
      const input = getInput(component);

      component.find(Autocomplete).prop('setItems')(items); // Dirty hack with initial rendering of dropdown
      component.update();

      expect(input.instance().value).toBe('');
      getDropdownItems(component).first().simulate('mousedown');
      expect(input.instance().value).toBe('123');
    });

    it('should call callback, when user selects value', () => {
      const onChange = jest.fn();
      const component = setupComponent({ onChange, isDropdownVisible: true }, Component);

      component.find(Autocomplete).prop('setItems')(items); // Dirty hack with initial rendering of dropdown
      component.update();

      getDropdownItems(component).first().simulate('mousedown');

      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0]).toEqual(['345']);
    });
  });

  describe('showing/hiding the dropdown', () => {
    const Component = withFocusManagement(Autocomplete);

    it('should show/hide dropdown, when input field gets/looses a focus', () => {
      const items = [
        { label: '123', value: '345' },
        { label: '567', value: '789' },
      ];
      const component = setupComponent({ items, inputValue: '123' }, Component);
      const input = getInput(component);

      expect(getDropdown(component)).toHaveLength(0);

      input.simulate('focus');
      component.update();

      expect(getDropdown(component)).toHaveLength(1);

      input.simulate('blur');
      component.update();

      expect(getDropdown(component)).toHaveLength(0);
    });

    it('shouldn\'t render dropdown, if there are no items provided', () => {
      const component = setupComponent({ items: [], inputValue: '123' }, Component);
      const input = getInput(component);

      input.simulate('focus');
      component.update();

      expect(getDropdown(component)).toHaveLength(0);
    });
  });
});
