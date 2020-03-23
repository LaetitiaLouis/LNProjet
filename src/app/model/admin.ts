import {Projet} from './projet';

export class Admin {
  id: number;
  login: string;
  password: string;
  presentation: string;
  projets: Projet[];
}
