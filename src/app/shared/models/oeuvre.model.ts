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

  constructor(oeuvre: OeuvreModel) {
    this.id = oeuvre.id;
    this.type = oeuvre.type;
    this.titre = oeuvre.titre;
    this.statut = oeuvre.statut;
    this.genres = oeuvre.genres;
    this.note = oeuvre.note;
    this.video = oeuvre.video;
    this.duree = oeuvre.duree;
  }
}
