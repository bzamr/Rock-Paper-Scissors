import {assert,test,expect} from 'vitest';
import { generate_random_number , choice_menu, random_choice } from '../src/machine-ai';


test("random number between 0 and 2",()=>{
    let rnd_number = generate_random_number(0,2);
    expect(rnd_number).toBeGreaterThanOrEqual(0)
    expect(rnd_number).toBeLessThanOrEqual(2);
});

test("random choice, options: [rock, paper,scissors]" , ()=>{
    const menu = choice_menu();
    let choice = random_choice();

    assert.propertyVal(menu,choice.description,choice);
});

