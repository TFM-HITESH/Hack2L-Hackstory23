import { databases } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo,  columnId: TypedColumn) => void;

    searchString: string;
    setSearchString: (searchString: string) => void;

    newTaskInput: string;
    newTaskType: TypedColumn;
    setNewTaskInput: (input: string) => void;

    setNewTaskType: (columnId: TypedColumn) => void;

    image: File | null;
    setImage: (image: File | null ) => void;

    //addTask: (todo:string, columnId: TypedColumn, image?:File | null) => void;
    //deleteTask: (taskIndex:number , todoId : Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  searchString: "",
  newTaskInput: "",
  newTaskType: "todo",
  image: null,
  
  setSearchString: (searchString) => set({ searchString }),
  setNewTaskInput: (input: string) => set({newTaskInput: input}),
  setNewTaskType: (columnId: TypedColumn) => set({newTaskType: columnId}),  

  getBoard: async() => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  setBoardState: (board) => set({ board }), 

  setImage: (image: File | null) => set({ image }),
  

  updateTodoInDB: async(todo, columnId) => {
    const databaseId = '647d9982ac77b1ddddd0'; 
    const collectionId = '647d9998793e71dcf35a';
    await databases.updateDocument(
        databaseId,
        collectionId,
        todo.$id,
        {
            title: todo.title,
            status: columnId,
        }
    )
  },

  //addTask: async (todo: string, columnId: TypedColumn, image?:File|null) => {
  //  let file = Image | undefined; 
  //},

  //deleteTask: (taskIndex:number , todoId : Todo, id: TypedColumn) => {
  //
  //}


}));

