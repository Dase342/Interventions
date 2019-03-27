import { ValidatorFn, AbstractControl } from '@angular/forms';



export class longueurMinimum {
  static range(longueur: number): ValidatorFn {
    // Sous ANGULAR dans les validateurs pour indiquer un succès retourner NULL
    return (valeurControl: AbstractControl): {[key: string]: boolean} | null => {
          if (valeurControl.value && valeurControl.value.trim().length >= longueur ) {
                return null;
        }
       
        
      return{'rangeInvalide': true};
    };
  }
}