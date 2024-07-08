import { AddTodo, DeleteTodo, GetTodo } from "./ActionType";

export default function Reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case AddTodo:
      return { ...state, tasklist: [...state.tasklist, action.payload] };
      break;
    case GetTodo:
      return { ...state, tasklist: action.payload };
      break;
    case DeleteTodo:
      return {
        ...state,
        tasklist: state.tasklist.filter((v, i) => v.id !== action.payload),
      };
      break;

    default:
      return state;
      break;
  }
}
