import { Button, Drawer } from "antd";
import React from "react";

interface ProjectModalProps {
  projectModalOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = (props: ProjectModalProps) => {
  return (
    <Drawer
      visible={props.projectModalOpen}
      onClose={props.onClose}
      width={"100%"}
    >
      <h1>PorjectModal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
