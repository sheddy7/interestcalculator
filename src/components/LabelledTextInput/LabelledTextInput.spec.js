import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LabelledTextInput from './LabelledTextInput';

configure({ adapter: new Adapter() });

describe(LabelledTextInput.name, () => {
  describe('given default props', () => {
    const onChange = jest.fn();
    let wrapper;

    it('renders successfully', () => {
      wrapper = shallow(
        <LabelledTextInput label="amount" onChange={onChange} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('triggering onChange function passed to TextInput fires onChange prop', () => {
      wrapper
        .find('WithStyles(TextInput)')
        .props()
        .onChange();
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
