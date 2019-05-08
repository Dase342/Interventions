import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { longueurMinimum } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typeProbleme: ITypeProbleme[];
  errorMessage: string;

  probleme: IProbleme;
  messageSauvegarde: string;

  constructor(private fb: FormBuilder,private problemes: TypeproblemeService, private problemeService: ProblemeService) { }

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

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
         this.probleme = this.problemeForm.value;
         // Affecter les valeurs qui proviennent du fg le plus interne.
         this.probleme.courriel =  this.problemeForm.get('courrielGroup.courriel').value;
         this.probleme.courrielConfirmation =  this.problemeForm.get('courrielGroup.courrielConfirmation').value;     
       
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } 
  }
  
  onSaveComplete(): void {
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre problème a bien été sauvegardée.  Nous vous remercions.';
  }

}
