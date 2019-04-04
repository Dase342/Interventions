import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    errors = zone.errors||{};
    expect(errors["required"]).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 10 espaces', () => {
    
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    
    expect(zone.valid).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + 'a');
    
    expect(zone.valid).toBeFalsy();
  });

  it('#15 | TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('nePasNotifier');

    let zone = component.problemeForm.get('telephone');
    
    
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('nePasNotifier');

    let zone = component.problemeForm.get('telephone');
    
    
    expect(zone.value).toBeNull();
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('nePasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    
    
    expect(zone.status).toEqual('DISABLED');
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('nePasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    
    
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('parCourriel');

    let zone = component.problemeForm.get('telephone');
    
    
    expect(zone.status).toEqual('DISABLED');
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('parCourriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    
    errors = zone.errors||{};
    expect(errors["required"]).toBeTruthy();
    
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('parCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    
    
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('parCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let errors = {};
    zone.setValue("");

    errors = zone.errors||{};
    expect(errors["required"]).toBeTruthy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('parCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    
    zone.setValue("");
    let errors = {};
    errors = zone.errors||{};
    expect(errors["required"]).toBeTruthy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('parCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    
    zone.setValue("jjjjj.hotmail.com");
    let errors = {};
    errors = zone.errors||{};
    
    expect(errors['pattern']).toBeTruthy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('parCourriel');
   

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    zone2.setValue('asfg@hotmail.com')
    let group = component.problemeForm.get('courrielGroup');
   
    let errors = {};
    errors = group.errors||{};
    
    expect(errors['match']).toBeUndefined();
  });

  it('#26 |  Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('parCourriel');
   

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('nbvfds@hotmail.com');
    zone2.setValue('')
    let group = component.problemeForm.get('courrielGroup');
   
    let errors = {};
    errors = group.errors||{};
    
    expect(errors['match']).toBeUndefined();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('parCourriel');
   

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('nbvfds@hotmail.com');
    zone2.setValue('nbvdftykj@hotmail.com')
    let group = component.problemeForm.get('courrielGroup');
   
    let errors = {};
    errors = group.errors||{};
    
    expect(errors['match']).toBeTruthy();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('parCourriel');
   

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('nbvfds@hotmail.com');
    zone2.setValue('nbvfds@hotmail.com')
    let group = component.problemeForm.get('courrielGroup');
   
    let errors = {};
    errors = group.errors||{};
    
    expect(errors['match']).toBeFalsy();
  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('parTel');

    let zone = component.problemeForm.get('telephone');
    
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('parTel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    
    expect(zone.status).toEqual('DISABLED');
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('parTel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    
    expect(zone.status).toEqual('DISABLED');
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('parTel');

    let zone = component.problemeForm.get('telephone');
    zone.setValue("");
    let errors = {};
    errors = zone.errors||{};
    expect(errors["required"]).toBeTruthy();
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('parTel');

    let zone = component.problemeForm.get('telephone');
    zone.setValue("gdsagadh");
    let errors = {};
    errors = zone.errors||{};

    expect(errors['pattern']).toBeTruthy();
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('parTel');

    let zone = component.problemeForm.get('telephone');
    zone.setValue("123456789");
    let errors = {};
    errors = zone.errors||{};

    expect(errors['minlength']).toBeTruthy();
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('parTel');

    let zone = component.problemeForm.get('telephone');
    zone.setValue("12345678910");
    let errors = {};
    errors = zone.errors||{};

    expect(errors['maxlength']).toBeTruthy();
  });
  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('parTel');

    let zone = component.problemeForm.get('telephone');
    zone.setValue("1234567891");
    let errors = {};
    errors = zone.errors||{};

    expect(zone.valid).toBeTruthy();
  });
});
