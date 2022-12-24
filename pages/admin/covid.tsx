import React, { useEffect, useState } from "react";
import Logo from "../../components/logo";
import Image from "next/image";
import {
  UsersIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";

import Datepicker from "../../components/datepicker";
// import DataTable, { TableColumn } from "react-data-table-component";

export default function covid() {
  const [table, setTable] = useState<checkinTable[]>();
  const [checkin, setCheckin] = useState(0);
  const [users, setUsers] = useState(0);

  // const columns: TableColumn<checkinTable>[] = [
  //   {
  //     name: "Line Name",
  //     selector: (row) => row.user.name,
  //   },
  //   {
  //     name: "Checkin Date",
  //     selector: (row) => row.checkinTime,
  //   },
  //   {
  //     name: "Temp",
  //     selector: (row) => row.temp,
  //   },
  //   {
  //     name: "Coad",
  //     selector: (row) => row.cordNumber,
  //   },
  //   { name: "Edit" },
  // ];

  const exportSLSX = () => {
    
    // const data = JSON.stringify(table);
    // const obj = JSON.parse(data);

    // console.log(obj);
    // const worksheet = XLSX.utils.json_to_sheet(obj);
    // const workbook = XLSX.utils.book_new();

    // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const startPick = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const endPick = (e.currentTarget.elements[3] as HTMLInputElement).value;
    const bodyBuild = JSON.stringify({
      start: `${startPick}`,
      end: `${endPick}`,
    });

    await fetch("/api/checkin/bydate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyBuild,
    })
      .then((res) => res.json())
      .then((data) => {
        setTable(data);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/checkin/")
        .then((res) => res.json())
        .then((data) => {
          setCheckin(data.length);
        });

      await fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.length);
        });
    };
    // fetchData();
  }, []);

  return (
    <div>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="w-80">
            <Logo></Logo>
          </div>
        </div>
      </nav>

      {/* Stat */}
      <div className="relative md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              {/* All Check In */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          All Checkin
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          {checkin}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                          <MapPinIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ALL User */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          ALL USERS
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          {users}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                          <UsersIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* I Don't know 1 */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          I Don't know 1
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          0
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                          <QuestionMarkCircleIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* I Don't know 2 */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          I Don't know 2
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          0
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                          <QuestionMarkCircleIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <div className="flex justify-between items-center py-4 px-6">
              <div>
                <label>Checkin Table</label>
              </div>
              <form className="relative" onSubmit={formSubmit}>
                <div className="inline-flex">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 px-5 mt-2 font-SCGRegular text-gray-900 "
                  >
                    Start Date
                  </label>
                  <Datepicker name="startDate"></Datepicker>
                </div>
                <div className="inline-flex">
                  <label
                    htmlFor="enddDate"
                    className="block mb-2 px-5 mt-2 font-SCGRegular text-gray-900 "
                  >
                    End Date
                  </label>
                  <Datepicker name="enddDate"></Datepicker>
                </div>
                <div className="inline-flex">
                  <button
                    type="submit"
                    // onClick={() => handleClick()}
                    className="text-white ml-2 right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 "
                  >
                    Search
                  </button>
                </div>
                <div className="inline-flex">
                  <button
                    type="button"
                    // disabled={table?.length != 0 ? false : true}
                    onClick={() => exportSLSX()}
                    className="text-white ml-2 right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                  >
                    Export
                  </button>
                </div>
              </form>
            </div>
            <div className="overflow-x-auto  shadow-md sm:rounded-lg">
              {/* <DataTable columns={columns} data={table} pagination /> */}
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      No.
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Customer name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Line Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Checkin Date
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Temp
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Coad
                    </th>
                    <th scope="col" className="py-3 px-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table?.map((key, value) => {
                    return (
                      <tr
                        className="bg-white border-b hover:bg-gray-50"
                        key={`${key.id}`}
                      >
                        <td className="py-4 px-6">{value}</td>
                        <th
                          scope="row"
                          className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <Image
                            src={`${key.user.image}`}
                            alt={"Img"}
                            width={0}
                            height={0}
                            className={"w-10 h-10 rounded-full"}
                            priority
                          />

                          <div className="pl-3">
                            <div className="text-base font-semibold text-gray-500">
                              {key.user.profile[0].firstname}{" "}
                              {key.user.profile[0].lastname}
                            </div>
                            <div className="font-normal text-gray-500">
                              {key.user.email}
                            </div>
                          </div>
                        </th>
                        <td className="py-4 px-6">{key.user.name}</td>
                        <td className="py-4 px-6">
                          {new Date(key.checkinTime).toLocaleString("EN")}
                        </td>
                        <td className="py-4 px-6">{key.temp}</td>
                        <td className="py-4 px-6">{key.cordNumber}</td>
                        <td className="py-4 px-6 text-right">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
