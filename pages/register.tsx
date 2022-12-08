import React from "react";
import { useSession } from "next-auth/react";
import Logo from "../components/logo";
import Datepicker from "../components/datepicker";

export default function register() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center justify-center">
              <Logo></Logo>
            </div>
            <h2 className="mt-6 text-center text-5xl font-SCGBold tracking-tight text-gray-900">
              สมัครสมาชิก
            </h2>
          </div>

          <form action="/api/users" method="post">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="form-group">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-SCGRegular text-gray-900 form-label"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-control border border-gray-300 text-gray-900 font-SCGRegular text-sm rounded-lg focus:ring-red-500 focus:outline-none focus:ring-1 focus:border-red-500 block w-full p-2.5 "
                  placeholder="ชื่อ"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-SCGRegular text-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="border border-gray-300 text-gray-900 font-SCGRegular text-sm rounded-lg focus:ring-red-500 focus:outline-none focus:ring-1 focus:border-red-500 block w-full p-2.5 "
                  placeholder="นามสกุล"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="nickname"
                  className="block mb-2 text-sm font-SCGRegular text-gray-900 "
                >
                  Nick name
                </label>
                <input
                  type="text"
                  id="nickname"
                  name="nick_name"
                  className="border border-gray-300 text-gray-900 font-SCGRegular text-sm rounded-lg focus:ring-red-500 focus:outline-none focus:ring-1 focus:border-red-500 block w-full p-2.5 "
                  placeholder="ชื่อเล่น"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="sex"
                  className="block mb-2 text-sm font-SCGRegular text-gray-900 "
                >
                  Sex
                </label>
                <select
                  id="sex"
                  name="sex"
                  className="relative w-full font-SCGRegular text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                >
                  <option value={"M"}>Male</option>
                  <option value={"F"}>Female</option>
                  <option value={"N"}>Do not want to specify</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-sm font-SCGRegular text-gray-900 "
                >
                  Birdth day
                </label>
                <Datepicker></Datepicker>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-SCGRegular text-gray-900"
                >
                  Phone number
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  className="border border-gray-300 text-gray-900 font-SCGRegular text-sm rounded-lg focus:ring-red-500 focus:outline-none focus:ring-1 focus:border-red-500 block w-full p-2.5 "
                  placeholder="หมายเลขโทรศัพท์"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={session?.user?.email?.toString()}
                readOnly
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                I agree with the{" "}
                <a href="#" className="text-red-600 hover:underline ">
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
            >
              ลงทะเบียน
            </button>
          </form>
        </div>
      </div>
    );
  }
}
