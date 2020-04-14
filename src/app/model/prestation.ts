import {Projet} from './projet';
import {Client} from './client';

export class Prestation {
  id: number;
  intitule: string;
  categorie: string;
  projet: Projet;
  projets: Projet[];
}
