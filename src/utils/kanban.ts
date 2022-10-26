import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";

//请求列表数据
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  //param变化时重新请求
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
