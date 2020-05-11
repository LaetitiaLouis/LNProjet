import {Client} from "./client";

export class Message {
  id: number;
  objet: string;
  contenu: string;
  date: string;
  statutClient: boolean;
  vu: boolean;
  client: Client;
}
