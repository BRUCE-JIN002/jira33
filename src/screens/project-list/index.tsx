import React, { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List, Project } from "./list";
import { SerachPanel } from "./search-panel";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "../../utils/use-async";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";

export const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
	const [param, setParam] = useState({
		name: "",
		personId: "",
	});
	const debouncedParam = useDebounce(param, 200);
	const { isLoading, error, data: list } = useProjects(debouncedParam);
	const { data: users } = useUsers();
	return (
		<Container>
			<h1>项目列表</h1>
			<SerachPanel users={users || []} param={param} setParam={setParam} />
			{error ? (
				<Typography.Text type={"danger"}>{error.message}</Typography.Text>
			) : null}
			<List dataSource={list || []} users={users || []} loading={isLoading} />
		</Container>
	);
};

const Container = styled.div`
	padding: 3.3rem;
`;
