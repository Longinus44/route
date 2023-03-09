export enum STATUS {
  COMPLETED = "completed",
  PENDING = "pending",
}
export interface ITodoitem {
  id: string;
  item: string;
  status: STATUS;
  todo_id: string;
}
