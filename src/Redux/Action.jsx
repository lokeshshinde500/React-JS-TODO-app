import {
  AddTodo,
  DeleteTodo,
  GetTodo,
  UpdateTodo,
} from "./ActionType";

// TODO APP
export function AddTask(payload) {
  return { type: AddTodo, payload: payload };
}
export function GetTask(payload) {
  return { type: GetTodo, payload: payload };
}
export function DeleteTask(payload) {
  return { type: DeleteTodo, payload: payload };
}
export function UpdateTask(payload) {
  return { type: UpdateTodo, payload: payload };
}
export function PublicTask(payload) {
  return { type: Public, payload: payload };
}
export function PrivateTask(payload) {
  return { type: Private, payload: payload };
}
export function PersonalTask(payload) {
  return { type: Personal, payload: payload };
}
