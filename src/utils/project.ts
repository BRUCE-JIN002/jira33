import { useCallback, useEffect } from "react";
import { cleanObject } from ".";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//请求列表数据
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, run, fetchProjects]);

  return result;
};

//编辑列表项
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync(); //run 用来触发异步请求
  const client = useHttp(); //返回一个 promise
  const mutate = (params?: Partial<Project>) => {
    return run(
      client(`projects/${params?.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

//添加列表项
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync(); //run 用来触发异步请求
  const client = useHttp(); //返回一个 promise
  const mutate = (params?: Partial<Project>) => {
    return run(
      client(`projects/${params?.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
