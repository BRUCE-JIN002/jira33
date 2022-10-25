import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optmistic-options";

//请求列表数据
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  //param变化时重新请求
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

//获取项目详情
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};

//编辑列表项
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp(); //返回一个 promise
  return useMutation(
    (params?: Partial<Project>) =>
      client(`projects/${params?.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

//添加列表项
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp(); //返回一个 promise
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

//删除列表项
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp(); //返回一个 promise
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
