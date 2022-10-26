import { useLocation } from "react-router";
import { useProject } from "../../utils/project";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();

  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

//获取项目的整个的 url
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

//获取一个看板的所有任务
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

//获取一个看板的所有任务
export const useTaskSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useTasksQueryKey = () => ["tasks", useTaskSearchParams()];
