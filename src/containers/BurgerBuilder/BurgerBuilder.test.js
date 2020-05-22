import {BurgerBuilder} from './BurgerBuilder';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder OnInitIngredients={() => {}}/>);
    });
    it('Should render Build controls when Ingredients are available', () => {
        wrapper.setProps({ing: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});
