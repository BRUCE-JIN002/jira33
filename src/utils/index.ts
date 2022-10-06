import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
	value === undefined || value === null || value === "";

// { [key: string]: unknown }: 限制为键值对

export const cleanObject = (object: { [key: string]: unknown }) => {
	// Object.assign({}, object) == { ...object }
	const result = { ...object };
	Object.keys(result).forEach((key) => {
		const value = result[key];
		if (isVoid(value)) {
			delete result[key];
		}
	});
	return result;
};

//在页面刚加载的时候执行一次的函数
export const useMount = (callback: () => void) => {
	useEffect(() => {
		callback();
	}, []);
};

//防抖函数
//后面用泛型来规范类型
export const useDebounce = <T>(value: T, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		//每次变化后设置一个定时器
		const timeout = setTimeout(() => setDebouncedValue(value), delay);
		//每次在上一个useEffect处理完成之后再运行
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};
