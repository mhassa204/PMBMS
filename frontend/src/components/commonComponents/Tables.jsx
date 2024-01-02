import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useTable, useSortBy, usePagination } from "react-table";
import { Typography } from "@material-tailwind/react";

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

  return (
    <>
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="mt-4 w-full border-collapse table-auto text-left rounded-md overflow-hidden"
        >
          <thead className="bg-[#2f9149] text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="cursor-pointer border border-blue-gray-100 p-3 transition-colors hover:bg-blue-gray-50"
                  >
                    <div className="flex items-center justify-between gap-2 font-semibold leading-none opacity- text-sm">
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        ) : (
                          <ChevronUpIcon strokeWidth={2} className="h-4 w-4" />
                        )
                      ) : (
                        ""
                      )}
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
                  className="bg-white border-b border-blue-gray-50"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-3 text-sm">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-blue-gray-50 py-3 mb-4 mx-">
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
              !canPreviousPage ? "bg-gray-300" : "bg-[#2f9149]"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-1 text-white rounded-md ${
              !canNextPage ? "bg-gray-300" : "bg-[#2f9149]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Tables;
