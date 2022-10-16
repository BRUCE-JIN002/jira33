import styled from "@emotion/styled";
import { Divider, List, Typography } from "antd";
import Popover from "antd/lib/popover";
import React from "react";
import { useProjects } from "../utils/project";

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
  const { data: projects } = useProjects(); //获取项目列表
  const pinedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <Divider />
      <List>
        {pinedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {props.projectButton}
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
