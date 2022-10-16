import React from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { SerachPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectsSearchParams } from "./util";
import { Row } from "../../components/lib";

export const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button
          type={"primary"}
          onClick={() => props.setProjectModalOpen(true)}
        >
          创建项目
        </Button>
      </Row>
      <SerachPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
        refresh={retry}
        setProjectModalOpen={props.setProjectModalOpen}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.3rem;
`;
