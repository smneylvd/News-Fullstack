export enum LoadingStatus {
	ERROR = 'ERROR',
	NEVER = 'NEVER',
	SUCCESS = 'SUCCESS',
	LOADING = 'LOADING',
}

export interface ISnackbar {
	visible: boolean,
	status?: 'error' | 'success' | 'warning' | 'info',
	message?: string;
}

export interface Pagination {
	page: number,
	per_page: number,
	page_count: number,
	total_count: number,
	links?: {
		first?: string,
		last?: string,
		next?: string
	}
}