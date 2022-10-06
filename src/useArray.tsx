import React from "react";
import { useArray } from "./utils/useArray";

export const TsReactTest = () => {
	const persons: { name: string; age: number }[] = [
		{ name: "Jack", age: 20 },
		{ name: "Tom", age: 21 },
		{ name: "Rose", age: 18 },
	];

	const { add, clear, value, removeIndedx } = useArray(persons);

	// useMemo(() => {
	//   console.log(value.notExist);

	//   add({name: "JACK"});

	//   removeIndedx("123");
	// }, [])

	return (
		<div>
			<button onClick={() => add({ name: "John", age: 34 })}>add John</button>
			<button onClick={() => removeIndedx(0)}>remove 0</button>
			<button onClick={() => clear()} style={{ marginBottom: "50px" }}>
				clear
			</button>
			{value.map((person, index) => (
				<div style={{ marginLeft: "30px" }}>
					<span style={{ color: "red" }}> {index}</span>
					<span style={{ marginLeft: "30px" }}>{person.name}</span>
					<span style={{ marginLeft: "30px" }}>{person.age}</span>
				</div>
			))}
		</div>
	);
};
