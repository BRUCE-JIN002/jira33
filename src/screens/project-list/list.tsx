import React from "react";
import { User } from "../../types/user";
import { Dropdown, Menu, MenuProps, Modal, Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { ColumnsType } from "antd/lib/table";
import { Project } from "../../types/project";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }); //柯里化

  const columns: ColumnsType<Project> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(value, project) {
        return (
          <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
        );
      },
    },
    {
      title: "名称",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>;
      },
    },
    {
      title: "负责人",
      render(value, project) {
        return (
          <span>
            {users.find((user) => user.id === project.personId)?.name || "未知"}
          </span>
        );
      },
    },
    { title: "部门", dataIndex: "organization" },
    {
      title: "创建时间",
      render(value, project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD")
              : undefined}
          </span>
        );
      },
    },
    {
      title: "更多操作",
      render(value, project) {
        return <More project={project} />;
      },
    },
  ];

  return <Table pagination={false} columns={columns} {...props} />;
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteProject({ id }),
    });
  };

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "edit") {
      startEdit(project.id);
    } else if (e.key === "delete") {
      confirmDeleteProject(project.id);
    }
  };

  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            { label: "编辑", key: "edit" },
            { label: "删除", key: "delete" },
          ]}
          onClick={onClick}
        />
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
