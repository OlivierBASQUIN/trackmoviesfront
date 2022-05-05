export class StatutModel {
  id: number;
  libelle: string;

  constructor(statut:any){
    this.id = statut.id;
    this.libelle = statut.libelle;
  }
}
