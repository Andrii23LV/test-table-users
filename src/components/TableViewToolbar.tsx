import React from "react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationControlsProps) => {
    const canMoveBackByOne = currentPage > 1;
    const canMoveBackByFive = currentPage > 5;
    const canMoveForwardByOne = currentPage < totalPages;
    const canMoveForwardByFive = currentPage + 5 <= totalPages;

    const handleMovePage = (increment: number) => {
        const newPage = currentPage + increment;
        onPageChange(newPage);
    };

    return (
        <div className="flex flex-row items-center gap-2.5 border-collapse border-l border-gray-300 pl-4" >
            <button onClick={() => handleMovePage(-5)} disabled={!canMoveBackByFive}>
                {'<<'}
            </button>
            <button onClick={() => handleMovePage(-1)} disabled={!canMoveBackByOne}>
                {'<'}
            </button>
            <p>
                Page {currentPage} of {totalPages}
            </p>
            <button onClick={() => handleMovePage(1)} disabled={!canMoveForwardByOne}>
                {'>'}
            </button>
            <button onClick={() => handleMovePage(5)} disabled={!canMoveForwardByFive}>
                {'>>'}
            </button>
        </div>
    );
};

interface TableViewToolbarProps {
    selectedAmount: number;
    allItemsAmount: number;
    rowsPerPage: 10 | 25 | 50;
    currentPage: number;
    changeRowsPerPage: (amount: 10 | 25 | 50) => void;
    changePage: (page: number) => void;
    dataLength: number;
}

const rowAmounts: number[] = [10, 25, 50];

const TableViewToolbar = ({
    selectedAmount,
    allItemsAmount,
    rowsPerPage,
    currentPage,
    changeRowsPerPage,
    changePage,
    dataLength,
}: TableViewToolbarProps) => {
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10) as 10 | 25 | 50;
        const totalPages = Math.ceil(dataLength / newRowsPerPage);

        // Ensure currentPage remains within the valid range after changing rowsPerPage
        const validPage = Math.min(currentPage, totalPages);
        changeRowsPerPage(newRowsPerPage);
        changePage(validPage);
    };

    const totalPages = Math.ceil(dataLength / rowsPerPage);

    return (
        <div className="flex flex-row justify-between gap-4 gray_border text-xs items-center">
            <p>{selectedAmount} of {allItemsAmount} row(s) selected.</p>
            <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2 border-collapse border-l border-gray-300 pl-4">
                    <p>Rows per page</p>
                    <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                        {rowAmounts.map((amount) => (
                            <option key={amount} value={amount}>
                                {amount}
                            </option>
                        ))}
                    </select>
                </div>
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
            </div >
        </div >
    );
};

export default TableViewToolbar;
