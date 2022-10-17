import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "./project-list.slice";

export const ProjectModal = () => {
  const projectModalOpen = useSelector(selectProjectModalOpen);
  const dispatch = useDispatch();
  return (
    <Drawer
      open={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      width={"100%"}
    >
      <h1>PorjectModal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
