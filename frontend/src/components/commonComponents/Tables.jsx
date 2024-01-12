import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Typography } from "@material-tailwind/react";
import "@src/styles/tableStyles.css";

const Tables = ({ columns, data }) => {
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

  console.log("data: ", data);
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
                      cell.column.id === "CNICFrontImage" ||
                      cell.column.id === "CNICBackImage" ||
                      cell.column.id === "FacePicture" ||
                      cell.column.id === "BiometricImage" ? (
                        <img
                          src={cell.value}
                          alt="Bazar"
                          className="h-12 w-full"
                        />
                      ) : cell.column.id === "citiesInZone" &&
                        Array.isArray(cell.value) ? (
                        <p className="py-3">{cell.value.join(", ")}</p>
                      ) : (
                        <p className="py-3"> {cell.render("Cell")}</p>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-blue-gray-50 pt-8 ">
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
      </div>
    </div>
  );
};

export default Tables;
