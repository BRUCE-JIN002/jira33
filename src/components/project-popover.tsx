import React from "react";
import styled from "@emotion/styled";
import { Divider, List, Typography } from "antd";
import Popover from "antd/lib/popover";
import { useProjectModal } from "../screens/project-list/util";
import { useProjects } from "../utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const { data: projects } = useProjects(); //获取项目列表
  const { open } = useProjectModal();
  const pinedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <Divider />
      <List>
        {pinedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type={"link"} onClick={open}>
        创建项目
      </ButtonNoPadding>
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
