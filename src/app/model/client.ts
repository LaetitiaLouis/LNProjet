import {Projet} from './projet';
import {Prestation} from './prestation';
import {Message} from "./message";

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
  prestations: Prestation[];
  prestation: Prestation;
  message: Message[];
}
