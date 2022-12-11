import React from "react";
import { useSession } from "next-auth/react";
import Logo from "../components/logo";
import Datepicker from "../components/datepicker";

export default function register() {
  const { data: session } = useSession();
  return (
    <div className="flex min-h-full items-center justify-center pl-10 pr-10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="flex items-center justify-center">
            <Logo></Logo>
          </div>
          <h2 className="mt-6 text-center text-4xl font-SCGBold tracking-tight text-gray-900">
            สมัครสมาชิก
          </h2>
        </div>

        <form action="/api/users" method="post">
          <></>
          <div className="grid gap-5 mb-6 md:grid-cols-2 ">
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

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
              <label
                htmlFor="sex"
                className="block mb-2 text-sm font-SCGRegular text-gray-900 "
              >
                Sex
              </label>
              <select
                id="sex"
                name="sex"
                className="border bg-white h-12 border-gray-300 text-gray-900 font-SCGRegular text-sm rounded-lg focus:ring-red-500 focus:outline-none focus:ring-1 focus:border-red-500 block w-full p-2.5"
              >
                <option value={"M"}>Male</option>
                <option value={"F"}>Female</option>
                <option value={"N"}>Do not want to specify</option>
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="birthday"
                className="block mb-2 text-sm font-SCGRegular text-gray-900 "
              >
                Birdth day
              </label>
              <Datepicker></Datepicker>
            </div>

            <div className="form-group">
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
              className="block mb-2 text-sm font-SCGRegular text-gray-900 "
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
            className="text-white font-SCGBold bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg w-full  px-5 py-2.5 text-center "
          >
            ลงทะเบียน
          </button>
        </form>
      </div>
    </div>
  );
}
