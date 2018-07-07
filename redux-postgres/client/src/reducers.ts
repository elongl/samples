export default (state: string[] = [], action: Action): string[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, ...action.todos];

    case 'CLEAR_TODOS':
      return [];
  }
  return state;
};
interface Action {
  type: string;
  todos: string[];
}
