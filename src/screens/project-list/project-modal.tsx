import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer open={projectModalOpen} onClose={close} width={"100%"}>
      <h1>PorjectModal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
