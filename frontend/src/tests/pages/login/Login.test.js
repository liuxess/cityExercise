import {expect, test} from '@jest/globals';
import LogIn from '../../../pages/login/Login';
import { render, screen, fireEvent } from '@testing-library/react'

test('Render Login page and find button', ()=>{
    const buttonPressed = false;
    
    render(
        <LogIn setAuthenticated={()=>{buttonPressed=true}}/>
    );
     screen.findByText('Log In').then(
         (loginbutton) => {
             
            expect(loginbutton).not.toBeNull();
            expect(loginbutton).not.toBeUndefined();
            
            fireEvent.click( loginbutton);
            expect(buttonPressed).toBe(true);
         });

    
})
