import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";

//请求列表数据
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  //param变化时重新请求
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

//编辑列表项
export const useEditProject = () => {
  const client = useHttp(); //返回一个 promise
  const queryClient = useQueryClient();
  return useMutation(
    (params?: Partial<Project>) =>
      client(`projects/${params?.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

//添加列表项
export const useAddProject = () => {
  const client = useHttp(); //返回一个 promise
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
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
