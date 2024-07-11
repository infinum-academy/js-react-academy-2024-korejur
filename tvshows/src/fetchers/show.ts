import { fetcher } from '@/fetchers/fetcher';
import { IShow, IShowList } from '@/typings/show.types';

interface IShowListsResponse {
	showLists: Array<IShowList>;
	shows: IShow;
}

export function getShowLists() {
	return fetcher<IShowListsResponse>('/api/shows');
}

export function getTopRatedShowLists() {
	return fetcher<IShowListsResponse>('/api/shows/top-rated');
}

export function getShowList(id: string) {
	return fetcher<IShowList>(`/api/shows/${id}`);
}
