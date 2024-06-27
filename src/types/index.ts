export interface ApiT {
  getList(filter: string): Promise<{ ok: boolean; status: number; res: object }>;
  getItem(id: string): Promise<{ ok: boolean; status: number; res: object }>;
}

export interface UserT {
  id: string;
  created: number;
  karma: number;
  about: string;
  submitted: number[];
}

export interface ItemT {
  id: string;
  deleted: boolean;
  type: string;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: string;
  poll: string;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: string[];
  descendants: number;
}
