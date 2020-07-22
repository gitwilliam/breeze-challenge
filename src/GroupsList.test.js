import React from 'react';
import { shallow } from 'enzyme';
import GroupsList from './GroupsList';

let wrapper, data;

describe('<GroupsList />', () => {

    beforeAll(() => {
        wrapper = shallow(<GroupsList />)
        data = [{
            "id": 132,
            "group_name": "Elders"
        }]

        wrapper.setState({'column': null, 'data' : data, 'direction': null });
    });

    test('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
})
