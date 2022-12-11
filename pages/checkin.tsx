import { useSession } from "next-auth/react";
import React from "react";
import Logo from "../components/logo";
import Datepicker from "../components/datepicker";

export default function checkin() {
  const { data: session } = useSession();
  const options = [];

  for (var i = 1; i <= 12; i++) {
    options.push(i);
  }

  return (
    <div className="flex min-h-full items-center justify-center pl-10 pr-10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="flex items-center justify-center">
            <Logo></Logo>
          </div>
          <h2 className="mt-6 text-center text-4xl font-SCGBold tracking-tight text-gray-900">
            Check In
          </h2>
        </div>
        <form action="/api/checkin" method="post">
          <div className="mb-6">
            <div className="form-group">
              <label
                htmlFor="checkin-time"
                className="block mb-2 text-sm font-SCGRegular text-gray-900 "
              >
                Check in Date
              </label>
              <input
                type="text"
                id="checkin-time"
                name="checkin_time"
                className="border border-gray-300 text-gray-900 font-SCGRegular text-sm rounded-lg focus:ring-red-500 focus:outline-none focus:ring-1 focus:border-red-500 block w-full p-2.5 "
                value={new Date().toLocaleString()}
                readOnly
              />
            </div>
          </div>
          <div className="grid gap-5 mb-6 md:grid-cols-2 ">
            <div className="form-group">
              <label
                htmlFor="coad-number"
                className="block mb-2 text-sm font-SCGRegular text-gray-900 "
              >
                Coad Number
              </label>
              <select
                id="coad-number"
                name="coad_number"
                className="border bg-white h-12 border-gray-300 text-gray-900 font-SCGRegular text-sm rounded-lg focus:ring-red-500 focus:outline-none focus:ring-1 focus:border-red-500 block w-full p-2.5"
              >
                {options.map((index) => (
                  <option value={index}>{index}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="temp"
                className="block mb-2 text-sm font-SCGRegular text-gray-900 "
              >
                Today temperature
              </label>
              <input
                type="number"
                step="0.1"
                min="36"
                max="37.5"
                id="temp"
                name="temp"
                className="border border-gray-300 text-gray-900 font-SCGRegular text-sm rounded-lg focus:ring-red-500 focus:outline-none focus:ring-1 focus:border-red-500 block w-full p-2.5 "
                placeholder="อุณหภูมิร่างกาย (วันนี้)"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            {/* Q1 */}
            <div className="form-group mb-4">
              <label
                htmlFor="question-radio-g1"
                className="block mb-2 text-sm font-SCGBold text-gray-900 form-label"
              >
                1. In the last 5 days, Do you have any symptom below today?
                <p className="text-xs">
                  ในช่วง 5 วันที่ผ่านมา ท่านมีอาการอย่างใดอย่างหนึ่ง หรือไม่
                </p>
              </label>
              <div>
                <div className="flex items-center mb-4">
                  <input
                    id="question-radio-g1-1"
                    type="radio"
                    value={"1"}
                    name="question-radio-g1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="question-radio-g1-1"
                    className="ml-2 text-sm font-SCGRegular text-gray-900"
                  >
                    Fever with cough, runny nose, sore throat, no smell, rapid
                    and trouble breathing, trouble breathing. Either one.
                    <p className=" text-xs">
                      มีอาการไข้ ร่วมกับไอ น้ำมูก เจ็บคอ ไม่ได้กลิ่น
                      หายใจเร็วหายใจลำบาก อย่างใดอย่างหนึ่ง
                    </p>
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="question-radio-g1-2"
                    type="radio"
                    value={"2"}
                    name="question-radio-g1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="question-radio-g1-2"
                    className="ml-2 text-sm font-SCGRegular text-gray-900"
                  >
                    Fatigue, tiredness, dry cough, sore throat, fever, runny
                    nose, headache, dizziness, nausea, body aches and diarrhea.
                    Either one.
                    <p className="text-xs">
                      มีอาการ อ่อนเพลีย เหนื่อย, ไอแห้ง, เจ็บคอ, ไข้, มีน้ำมูก,
                      ปวดศีรษะ เวียนศีรษะ คลื่นไส้ ปวดเมื่อยตามร่างกาย
                    </p>
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="question-radio-g1-3"
                    type="radio"
                    value={"3"}
                    required
                    name="question-radio-g1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="question-radio-g1-3"
                    className="ml-2 text-sm font-SCGRegular text-gray-900"
                  >
                    None
                    <p className="text-xs">ไม่มีอาการ</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="form-group mb-4">
              <label
                htmlFor="question-radio-g2"
                className="block mb-2 text-sm font-SCGBold text-gray-900 form-label"
              >
                2. In the last 10 days, have you been in close contact with any
                of these people?
                <p className="text-xs">
                  ในช่วง 10 วันที่ผ่านมา ท่านใกล้ชิดกับบุคคลเหล่านี้หรือไม่
                </p>
              </label>
              <div>
                <div className="flex items-center mb-4">
                  <input
                    id="question-radio-g2-1"
                    value={"1"}
                    type="radio"
                    name="question-radio-g2"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="question-radio-g2-1"
                    className="ml-2 text-sm font-SCGRegular text-gray-900"
                  >
                    F0 : COVID-19 *Yes. With COVID-19 patient
                    <p className=" text-xs">เป็นผู้ป่วย</p>
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="question-radio-g2-2"
                    value={"2"}
                    type="radio"
                    name="question-radio-g2"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="question-radio-g2-2"
                    className="ml-2 text-sm font-SCGRegular text-gray-900"
                  >
                    F1 : Yes. With F0
                    <p className="text-xs">เป็นผู้ป่วยสัมผัสใกล้ชิด</p>
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="question-radio-g2-3"
                    required
                    value={"3"}
                    type="radio"
                    name="question-radio-g2"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="question-radio-g2-3"
                    className="ml-2 text-sm font-SCGRegular text-gray-900"
                  >
                    No close contact
                    <p className="text-xs">ไม่ได้สัมผัสใกล้ชิด</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white font-SCGBold bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg w-full  px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
