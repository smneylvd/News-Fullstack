export interface PaginationProps {
	currentPage: number;
	maxPage: number;
	onChange: (page: number) => void
}