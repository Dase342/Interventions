import { longueurMinimum } from "./longueur-minimum.component";
import { AbstractControl } from '@angular/forms';

describe('longueur zone Validator', () =>{
    it('une chaîne avec 10 espaces est invalide', () => {
        //preparer une variable pour manipuler le validateur
        let validator = longueurMinimum.range(3);
        let control = {value: '          '};
        //Faire al'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat obtenu avec le résultat prévu
        expect(result['rangeInvalide']).toBe(true);
    });

     it('une phrase avec des mots est valide', () => {
         //preparer une variable pour manipuler le validateur
         let validator = longueurMinimum.range(3);
         let control = {value: 'Vive angular' };
         //Faire al'appel du validateur
         let result = validator(control as AbstractControl);
         //Comparer le résultat obtenu avec le résultat prévu
         expect(result).toBeNull();
     });

     it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
         //preparer une variable pour manipuler le validateur
         let validator = longueurMinimum.range(3);
         let control = {value: ' je le veux ' };
         //Faire al'appel du validateur
         let result = validator(control as AbstractControl);
         //Comparer le résultat obtenu avec le résultat prévu
         expect(result).toBeNull();
     });

     it('une phrase avec 1 espace et 2 caractères est invalide.', () => {
         //preparer une variable pour manipuler le validateur
         let validator = longueurMinimum.range(3);
         let control = {value: ' xx' };
         //Faire al'appel du validateur
         let result = validator(control as AbstractControl);
        //Comparer le résultat obtenu avec le résultat prévu
        expect(result['rangeInvalide']).toBe(true);
    });

    it('une phrase avec 2 espaces et 1 caractère est invalide', () => {
        //preparer une variable pour manipuler le validateur
        let validator = longueurMinimum.range(3);
        let control = {value: ' x' };
        //Faire al'appel du validateur
        let result = validator(control as AbstractControl);
       //Comparer le résultat obtenu avec le résultat prévu
       expect(result['rangeInvalide']).toBe(true);
   });

   it('une phrase avec 3 espaces et 3 caractères est valide', () => {
    //preparer une variable pour manipuler le validateur
    let validator = longueurMinimum.range(3);
    let control = {value: ' xxx' };
    //Faire al'appel du validateur
    let result = validator(control as AbstractControl);
   //Comparer le résultat obtenu avec le résultat prévu
   expect(result).toBeNull();
    });
    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        //preparer une variable pour manipuler le validateur
        let validator = longueurMinimum.range(3);
        let control = {value: '     xxxxx     ' };
        //Faire al'appel du validateur
        let result = validator(control as AbstractControl);
    //Comparer le résultat obtenu avec le résultat prévu
    expect(result).toBeNull();
    });

    it('une chaîne nulle est invalide', () => {
        //preparer une variable pour manipuler le validateur
        let validator = longueurMinimum.range(3);
        let control = {value: null };
        //Faire al'appel du validateur
        let result = validator(control as AbstractControl);
    //Comparer le résultat obtenu avec le résultat prévu
    expect(result['rangeInvalide']).toBe(true);
    });
    
});
