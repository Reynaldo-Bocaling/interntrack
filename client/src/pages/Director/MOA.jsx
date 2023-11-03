import React, { useState } from "react";
import { getCompanyList } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { Document, Page } from "react-pdf";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

function LeaveRequest() {
  const [searchInput, setSearchInput] = useState('');
  const [viewMoa, setViewMoa] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [company, setCompany] = useState({});
  const { data } = useQuery(["getCompanyList"], getCompanyList);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleClick = (item) => {
    setCompany(item);
    setViewMoa(true);
  };


  const searchFilter = data?.filter((item)=>item.companyName.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-wider text-gray-700">
          Memorandum Of Agreement
        </h1>

        <div className=" h-10 w-[270px]  flex items-center gap-2 bg-white rounded-full px-3 shadow-md shadow-slate-200 duration-300">
          <BiSearch />
          <input
            type="text"
            placeholder="Search.."
            className="outline-none text-sm"
            onChange={(e)=>setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className=" w-full min-h-screen overflow-y-auto  flex justify-between items-start gap-5 rounded-xl">
        <div className={`${viewMoa ? "w-[40%]" : "w-[100%]"}`}>
          {searchFilter?.length > 0 ? (
            <div className="mt-5 grid gap-3 z-50">
              {searchFilter.map((item, index) => (
                <div
                  onClick={() => handleClick(item)}
                  key={index}
                  className=" bg-white shadow-lg shadow-gray-100 py-5 px-3 rounded-lg cursor-pointer"
                >
                  {item.companyName}
                </div>
              ))}
            </div>
          ) : (
            <center className="my-10">Not found</center>
          )}
        </div>

        {viewMoa && (
          <div className="relative mt-5 bg-gray-100 rounded-lg p-3 w-[60%] transition-all">
            <button
              onClick={() => setViewMoa(false)}
              className="text-blue-500  font-medium absolute top-5 rounded-full cursor-pointer"
            >
              <MdOutlineKeyboardArrowRight size={27} />
            </button>

            <div className="flex justify-center my-2 gap-3">
              <a
                href={company?.moaUrl}
                className="bg-blue-100 text-blue-500 py-1  rounded-md font-medium mb-2 px-5"
                size="sm"
              >
                {" "}
                view
              </a>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Document
                file={company?.moaUrl}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaveRequest;
