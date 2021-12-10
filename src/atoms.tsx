import { atom, selector } from 'recoil';

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
  'DELETE' = 'DELETE',
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const USERTODOLIST_KEY = 'todos';

const userGetTodo = localStorage.getItem(USERTODOLIST_KEY);
const parseTodo = JSON.parse(userGetTodo as string);

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: userGetTodo !== null ? parseTodo : [],
});

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
