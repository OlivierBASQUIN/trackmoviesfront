export class OeuvreModel {
  id: number;
  type: string;
  titre: string;
  statut: string;
  genre: string;
  note: number;
  video: string;

  constructor(oeuvreApiBack:any) {
    this.id     = oeuvreApiBack.id    ;
    this.type   = oeuvreApiBack.type  ;
    this.titre  = oeuvreApiBack.titre ;
    this.statut = oeuvreApiBack.statut;
    this.genre  = oeuvreApiBack.genre ;
    this.note   = oeuvreApiBack.note  ;
    this.video  = oeuvreApiBack.video ;
  }
}
