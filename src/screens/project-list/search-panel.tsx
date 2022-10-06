import React from "react";
import { Input, Select, Form } from "antd";

export interface User {
	id: string;
	name: string;
	email: string;
	title: string;
	token: string;
	organization: string;
}

interface SerchPanelProps {
	users: User[];
	param: {
		name: string;
		personId: string;
	};
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
				<Select
					value={param.personId}
					onChange={(value) =>
						setParam({
							...param,
							personId: value,
						})
					}
				>
					<Select.Option value={""}>负责人</Select.Option>
					{users.map((user) => (
						<Select.Option value={user.id} key={user.id}>
							{user.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
		</Form>
	);
};
