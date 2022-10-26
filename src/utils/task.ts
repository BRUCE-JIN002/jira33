import { useQuery } from "react-query";
import { Task } from "../types/task";
import { useHttp } from "./http";

//请求任务数据
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  //param变化时重新请求
  return useQuery<Task[]>(["task", param], () =>
    client("tasks", { data: param })
  );
};
