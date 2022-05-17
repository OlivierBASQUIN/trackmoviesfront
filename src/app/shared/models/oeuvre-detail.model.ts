
import { OeuvreModel } from '../models/oeuvre.model';
import { SaisonModel } from './saison.model';

export class OeuvreDetail extends OeuvreModel {
  duree: number;
  saisons : Array<SaisonModel>;

  constructor(oeuvreDetail: OeuvreDetail) {
    super(oeuvreDetail);
    this.duree = oeuvreDetail.duree;
    this.saisons=oeuvreDetail.saisons;
  }

}

