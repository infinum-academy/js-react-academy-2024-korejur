export interface IShow {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  image_alt?: string;
  average_rating?: number;
}

export interface IShowList {
  shows: Array<IShow>;
}
