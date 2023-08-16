import React from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";


const BasicTable = ({ data, columns }) => {
  

  console.log(data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {data.length > 0 ? (
        <div className="bg-white border p-2 rounded-lg">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="h-14 border-b" key={headerGroup.id}>
                  {headerGroup.headers.map((header1) => (
                    <th
                      className="tracking-wider text-sm  text-left pl-5"
                      key={header1.id}
                    >
                      {flexRender(
                        header1.column.columnDef.header,
                        header1.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr className="h-14" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className="text-sm text-left pl-5 " key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 mb-3 mr-3 flex items-center justify-end gap-3">
            <button
              onClick={() => {
                table.previousPage();
              }}
              className={`${!table.getCanPreviousPage() && "text-gray-500"}`}
              title="Previous Page"
            >
              <MdOutlineKeyboardArrowLeft size={25} />
            </button>

            <button
              onClick={() => {
                table.nextPage();
              }}
              className={`${!table.getCanNextPage() && "text-gray-500"}`}
              title="Next Page"
            >
              <MdKeyboardArrowRight size={25} />
            </button>

            <span>
              <strong>
                {table.getState().pagination.pageIndex + 1} {" / "}{" "}
                {table.getPageCount()}{" "}
              </strong>
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No data</div>
      )}
    </>
  );
};

export default BasicTable;
