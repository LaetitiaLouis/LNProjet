import {Projet} from './projet';

export class Client {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  codePostal: string;
  ville: string;
  email: string;
  telephone: string;
  refDevis: string;
  refFacture: string;
  projet: Projet;
  projets: Projet[];
  isProspect: boolean;
}
