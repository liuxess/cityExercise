import {expect, test} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../../../pages/global/SearchBar';

test('Render City page with two cities and check in on them', ()=>{
    let buttonPressed = false;
    render(
        <SearchBar inputValue={""} onRequestSearch={()=>{buttonPressed = true;}} />
    );
    screen.findByTitle("Search").then(
         (SearchButton) => {
            expect(SearchButton).not.toBeNull();
            expect(SearchButton).not.toBeUndefined();
            fireEvent.click(SearchButton);
            expect(buttonPressed).toBe(true);
         });
})
