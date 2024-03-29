import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Typography } from "@material-tailwind/react";
import "@src/styles/tableStyles.css";
import { Pagination } from "react-bootstrap";

const Tables = ({ columns, data, totalPages, currentPage, setCurrentPage }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  const lastVisiblePage = Math.min(currentPage + 4, totalPages);
  const firstVisiblePage = Math.max(lastVisiblePage - 9, 1);
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <div className="table-scroll">
        <table
          {...getTableProps()}
          className="w-full border-collapse table-auto text-left rounded-md overflow-hidden"
        >
          <thead className="bg-[#2f9149] text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="cursor-pointer border border-blue-gray-100 p-3 px-2 transition-colors hover:bg-blue-gray-50"
                  >
                    <div className="flex items-center justify-between gap-2 font-semibold leading-none text-nowrap opacity- text-sm">
                      {column.render("Header")}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  key={row.id}
                  className="border-b border-blue-gray-50 hover:bg-gray-100"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className=" px-2 text-nowrap text-sm w-max"
                    >
                      {cell.column.id === "bazarImage" ||
                      cell.column.id === "cnicFront" ||
                      cell.column.id === "cnicBack" ||
                      cell.column.id === "picture" ||
                      cell.column.id === "biometricImage" ? (
                        <img
                          src={cell.value}
                          alt="Bazar"
                          className="h-12 w-full"
                        />
                      ) : cell.column.id === "citiesInZone" &&
                        Array.isArray(cell.value) ? (
                        <p className="py-3">{cell.value.join(", ")}</p>
                      ) : cell.column.id === "active" ||
                        cell.column.id === "status" ||
                        cell.column.id === "editable" ||
                        cell.column.id === "vacant" ? (
                        cell.value === "Active" || cell.value === true ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        )
                      ) : (
                        <p className="py-3"> {cell.render("Cell")}</p>
                      )}
                      {/* {(cell.column.id === "active" ||
                        cell.column.id === "status" ||
                        cell.column.id === "vacant") && (
                        <div>
                          {cell.value === "Active" || cell.value === true ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </div>
                      )} */}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="flex items-center justify-between border-t border-blue-gray-50 pt-8 ">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal text-sm"
        >
          Page {pageIndex + 1} of {pageOptions.length}
        </Typography>
        <div className="flex gap-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-3 py-1 text-white rounded-md ${
              !canPreviousPage ? "bg-gray-700" : "bg-[#2f9149]"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-1 text-white rounded-md ${
              !canNextPage ? "bg-gray-700" : "bg-[#2f9149]"
            }`}
          >
            Next
          </button>
        </div>
      </div> */}
      <div className=" flex mt-8 flex-wrap justify-center">
        <Pagination>
          <Pagination.Prev
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Pagination.Prev>
          {renderPageNumbers()}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default Tables;
