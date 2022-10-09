import React from "react";
import { useUsers } from "../utils/user";
import { IdSelect } from "./id-select";

//带类型处理的用户选择组件
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
