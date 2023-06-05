import { databases } from "@/appwrite"
import { CommaListExpression } from "typescript";


export const getTodosGroupedByColumn = async() => {
    const databaseId = '647d9982ac77b1ddddd0'; 
    const collectionId = '647d9998793e71dcf35a';
    const data = await databases.listDocuments(databaseId, collectionId);

        console.log(data);

    const todos = data.documents;
        //acc = accumulator to go thru map
    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)){
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            //only get image if it exists.

            ...(todo.image && { image: JSON.parse(todo.image) })
        });

        return acc;

    }, new Map<TypedColumn, Column>)


    //if columsn doesnt have anything in it, adding empty todos to keep them displayed.

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    for (const columnType of columnTypes)
    {
        if(!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: [],
            });
        }
    }

    //sorting the columns

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort(
            (a,b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        )
    );

    const board: Board = {
        columns: sortedColumns
    }

    return board;
};

