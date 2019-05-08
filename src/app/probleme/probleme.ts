export interface IProbleme{
   
    id:  number,
    prenom: string,
    nom: string,
    noProbleme: number,
    courriel?: string,
    courrielConfirmation?: string,
    telephone?: number,
    notification: string,
    noUnite?: string,
    descriptionProbleme: string,
    dateProbleme: Date
}