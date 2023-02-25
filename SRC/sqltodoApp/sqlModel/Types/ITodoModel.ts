export interface ITodo {
  id: string;
  title: string;
  item: string;
  user_id: string;
  status: "completed" | "pending";
  user: Object;
}
