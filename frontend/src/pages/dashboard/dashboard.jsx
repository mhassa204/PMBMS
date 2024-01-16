import React from "react";
import Piechart from "@components/charts/Piechart";
import Linechart from "@components/charts/Linechart";
import Barchart from "@components/charts/Barchart";
import Piechart1 from "@components/charts/Piechart1";

export default function Dashboard() {
  return (
    <div className="bg-blue-100 pt-3 p-2">
      <div className="flex">
        <div>
          <div className="flex gap-2 mb-2">
            <div className="bg-white flex justify-between rounded w-[185px] text-start p-2 ps-3">
              <div>
                <h2 className="font-bold text-3xl text-[#16356a] ">75</h2>
                <p>Total Bazars</p>
              </div>
              <div className="w-[3px] h-[60px] bg-blue-800 rounded "> </div>
            </div>
            <div className="bg-white flex justify-between rounded w-[185px] text-start p-2 ps-3">
              <div>
                <h2 className="font-bold text-3xl text-[#16356a] ">7800</h2>
                <p>Total Stalls</p>
              </div>
              <div className="w-[3px] h-[60px] bg-blue-800 rounded "> </div>
            </div>
            <div className="bg-white flex justify-between rounded w-[185px] text-start p-2 ps-3">
              <div>
                <h2 className="font-bold text-3xl text-[#16356a] ">15</h2>
                <p>Total Zones</p>
              </div>
              <div className="w-[3px] h-[60px] bg-blue-800 rounded "> </div>
            </div>
            <div className="bg-white flex justify-between rounded w-[185px] text-start p-2 ps-3">
              <div>
                <h2 className="font-bold text-3xl text-[#16356a] ">100</h2>
                <p>Total Cities</p>
              </div>
              <div className="w-[3px] h-[60px] bg-blue-800 rounded "> </div>
            </div>
          </div>
          <Linechart />
        </div>
        <div className="ms-2 h-[383px] rounded flex flex-column items-center w-full bg-white">
          <div>
            <h3 className="font-bold text-3xl mt-4">Task Completion</h3>
          </div>
          <Piechart1 />
        </div>
      </div>
      <div className="">
        <div className="flex gap-2 ">
          <Barchart />
          <Piechart />
          <Barchart />
        </div>
      </div>
    </div>
  );
}
