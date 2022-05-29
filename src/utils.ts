export type Dict<T> = { [key: string]: T };

export type Fail<T> = {
	err: T;
	res?: never;
};
export type Success<U> = {
	err?: never;
	res: U;
};
export type Result<T, U> = NonNullable<Fail<T> | Success<U>>;

export function makeFail<T>(value: T): Fail<T> {
	return { err: value };
}
export function makeSuccess<U>(value: U): Success<U> {
	return { res: value };
}
