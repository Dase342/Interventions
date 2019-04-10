import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { longueurMinimum } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typeProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder,private problemes: TypeproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom:['',[ longueurMinimum.range(3), Validators.required]],
      nom:['',[ Validators.maxLength(50), Validators.required]],
      noProbleme: ['',[Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}]

        }),
       telephone: [{value: '', disabled: true}],
       notification: ['aucun'],
       descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
       noUnite: '',
       dateProbleme: {value: Date(), disabled: true} 
    });

    this.problemes.obtenirProbleme()
    .subscribe(cat => this.typeProbleme = cat,
               error => this.errorMessage = <any>error);  

    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));

  }

  appliquerNotifications(typeNotif: string): void{
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');      

    const telControl = this.problemeForm.get('telephone');




    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telControl.clearValidators();
    telControl.reset();    
    telControl.disable();

    if (typeNotif==='parCourriel') {
      courrielControl.enable();
      courrielConfirmationControl.enable(); 

      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);              
       
      // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
      // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
     // courrielControl.setValidators([Validators.compose([emailMatcherValidator.])]);    
     courrielGroupControl.setValidators(Validators.compose([emailMatcherValidator.courrielDifferents()]));
     
    } else if (typeNotif ==='parTel'){
      telControl.enable();
      telControl.setValidators([Validators.required,Validators.pattern('[0-9]+'),Validators.minLength(10),Validators.maxLength(10)]);

    } else {
        
      courrielControl.disable();     
      courrielConfirmationControl.disable();  
      telControl.disable();
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
    

  }

}
