import {Photo} from './photo';
import {Prestation} from './prestation';
import {Type} from './type';
import {Client} from './client';
import {Admin} from './admin';

export class Projet {
  id: number;
  intitule: string;
  description: string;
  admin: Admin;
  type: Type;
  photo: Photo;
  photos: Photo[];
  prestation: Prestation;
  prestations: Prestation[];
  client: Client;
  photoId: number;
}
