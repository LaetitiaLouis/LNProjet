import {Projet} from './projet';

export class Prestation {
  id: number;
  intitule: string;
  contenu: string;
  projet: Projet;
  projets: Projet[];
}
