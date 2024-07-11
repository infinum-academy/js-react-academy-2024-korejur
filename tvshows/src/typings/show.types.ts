export interface IShow {
  // average_rating: any;
  // map: any;
  id?: number;
  title: string;
  description: string;
  image_url?: string;
  image_alt?: string;
  averageRating?: number;
}

export interface IShowList {
  id?: number;
  title: string;
  shows: Array<IShow>;
}

export interface IShowDetailsProps {
  show: IShow;
  averageRating: number | null;
}
