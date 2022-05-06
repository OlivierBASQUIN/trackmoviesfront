import { GenreModel } from '../models/genre.model';
import { StatutModel } from '../models/statut.model';

export class OeuvreModel {
  id: number;
  type: string;
  titre: string;
  genres: GenreModel[];
  statut: StatutModel;
  note: number;
  video: string;
  duree: number;

  constructor(oeuvreApiBack: any) {
    this.id = oeuvreApiBack.id;
    this.type = oeuvreApiBack.type;
    this.titre = oeuvreApiBack.titre;
    this.statut = oeuvreApiBack.statut;
    this.genres = oeuvreApiBack.genres;
    this.note = oeuvreApiBack.note;
    this.video = oeuvreApiBack.video;
    this.duree = oeuvreApiBack.duree;
  }
}
