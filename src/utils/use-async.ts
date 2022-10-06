import { useState } from "react";

interface State<D> {
	error: Error | null;
	data: D | null;
	stat: "idle" | "loading" | "error" | "success";
}

const deafultInitialState: State<null> = {
	stat: "idle",
	data: null,
	error: null,
};

const deafultConfig = {
	throwOnError: false,
};

export const useAsync = <D>(
	intialState?: State<D>,
	intialConfig?: typeof deafultConfig
) => {
	const config = { ...deafultConfig, ...intialConfig };
	const [state, setState] = useState<State<D>>({
		...deafultInitialState,
		...intialState,
	});
	const setData = (data: D) =>
		setState({
			data,
			stat: "success",
			error: null,
		});
	const setError = (error: Error) =>
		setState({
			error,
			stat: "error",
			data: null,
		});

	//run 用来触发异步请求
	const run = (promise: Promise<D>) => {
		if (!promise || !promise.then) {
			throw new Error("请传入promise类型的数据");
		}
		setState({ ...state, stat: "loading" });
		return promise
			.then((data) => {
				setData(data);
				return data;
			})
			.catch((error) => {
				setError(error);
				if (config.throwOnError) return Promise.reject(error);
				return error;
			});
	};

	return {
		isIdle: state.stat === "idle",
		isLoading: state.stat === "loading",
		isError: state.stat === "error",
		isSuccess: state.stat === "success",
		run,
		setData,
		setError,
		...state,
	};
};
