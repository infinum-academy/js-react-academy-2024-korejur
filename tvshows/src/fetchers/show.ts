import { fetcher } from '@/fetchers/fetcher';
import { IShow, IShowList } from '@/typings/show.types';

interface IShowListsResponse {
	showLists: Array<IShowList>;
	shows: IShowList;
}

export function getShowsList() {
	return fetcher<IShowListsResponse>('/api/shows');
}

export function getTopRatedShowsList() {
	return fetcher<IShowListsResponse>('/api/shows/top-rated');
}

export function getShow(id: string) {
	return fetcher<IShow>(`/api/shows/${id}`);
}
