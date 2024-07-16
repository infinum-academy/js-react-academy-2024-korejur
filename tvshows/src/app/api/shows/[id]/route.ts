import { IShowList } from "@/typings/show.types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const showsJson = require('../../../../shows.json');

export async function GET(_request: Request, { params }: { params: { id: string } }) {
	if (params.id) {
		const show = showsJson.shows.find((show: { id: string; }) => show.id === params.id);

		if (show) {
			return Response.json(show);
		}
	}

	return null;
}

export async function POST(_request: Request, { params, body }: { params: { id: string }, body: IShowList }) {
	if (params.id && body) {
		
		console.log('body', body, params.id);
		// const todoListIndex = todoListsJson.todoLists.findIndex((todoList: ITodoList) => todoList.id === params.id);

		// if (todoListIndex !== -1) {
		// 	todoListsJson.todoLists[todoListIndex] = body;
		// 	return Response.json(body);
		// }
	}

	return null;
}