import React from 'react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Languages from '../components/Languages/Languages';
import axios from 'axios';


jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const dummyData = {
    data: [{
        "Ruby": 66.69,
        "JavaScript": 22.98,
        "HTML": 7.91,
        "CoffeeScript": 2.42
      }]
}

it("Making language graph and value of passed props", async () => {
    mockedAxios.get.mockResolvedValue(dummyData);
    const component = renderer.create(
        <Languages url="https://gitlab.com/AProject/Group/Folder" api="null"/>
    );
    await act(async () => {});
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(component.root.props).toStrictEqual({ url: 'https://gitlab.com/AProject/Group/Folder', api: 'null' })

    act(() => {component.update(<Languages url="https://gitlab.com/SomeProject/Group/Folder" api="noApiToken"/>)})
    expect(component.root.props).toStrictEqual({ url: 'https://gitlab.com/SomeProject/Group/Folder', api: 'noApiToken' })

});