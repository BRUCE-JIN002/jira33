import React from "react";
import { Input, Form } from "antd";
import { Project } from "./list";
import { UserSelect } from "../../components/user-select";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  token: string;
  organization: string;
}

interface SerchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SerchPanelProps["param"]) => void;
}

export const SerachPanel = ({ users, param, setParam }: SerchPanelProps) => {
  return (
    <Form layout={"inline"} style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type={"text"}
          value={param.name}
          placeholder={"项目名"}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
