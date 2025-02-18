export type TResponse<T> = { total: number; items: T | null };

export type TResponseList<T> = TResponse<T[]>;
