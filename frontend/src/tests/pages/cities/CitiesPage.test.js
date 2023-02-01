

import {expect, test} from '@jest/globals';
import { render, screen } from '@testing-library/react'
import { CitiesPage } from '../../../pages/Cities/CitiesPage';

test('Render City page with two cities and check in on them', ()=>{
    const mockedCities = [{id:0, name:"Test", photo:"none"}, {id:0, name:"Test 2", photo:"none"}]
    const emptyMethod = () => {};
    render(
        <CitiesPage page={0} size={10} search={""} cities={mockedCities}
        totalPages={1} totalSize={2} 
        setPage={emptyMethod} setSize={emptyMethod} setSearch={emptyMethod}
        allowEdit={false} updateCity={emptyMethod} triggerRefresh={emptyMethod} />
    );
     screen.findByText('Test').then(
         (firstCity) => {
            expect(firstCity).not.toBeNull();
            expect(firstCity).not.toBeUndefined();
         });

    screen.findByText('Test 2').then(
    (secondCity) => {
        expect(secondCity).not.toBeNull();
        expect(secondCity).not.toBeUndefined();
    });
})
