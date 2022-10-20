import React from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SerachPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Button } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ErrorBox, Row } from "../../components/lib";
import { PlusCircleOutlined } from "@ant-design/icons";

export const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button type={"primary"} onClick={open}>
          <PlusCircleOutlined />
          创建项目
        </Button>
      </Row>
      <SerachPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.3rem;
`;
