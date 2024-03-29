export enum STATUS {
  COMPLETED = "completed",
  PENDING = "pending",
}

export interface ITodo {
  id: string;
  title: string;
  user_id: string;
  status: STATUS;
}
