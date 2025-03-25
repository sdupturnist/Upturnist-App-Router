"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  wordpressGraphQlApiUrl,
  frontendUrl,
  siteEmail,
  siteFromEmail,
} from "../../utils/variables";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { format, differenceInCalendarDays, isWeekend } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";

export default function LandingPageSubscribeForm() {
  const router = useRouter();

  const { setShowModal } = useModalContext();
  const { theme } = useThemeContext();

  const formField = useRef(null);
  const timesRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [modeMeeting, setModeMeeting] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeBox, setTimeBox] = useState(false);
  const [formBox, setFormBox] = useState(false);

  const [today, setToday] = useState(null); // New state for today's date

  useEffect(() => {
    setToday(new Date()); // Set today's date on mount
  }, []);

  //AVILABLE TIMES
  const times = [
    "10 AM",
    "11 AM",
    "12 PM",
    "01 PM",
    "02 PM",
    "03 PM",
    "04 PM",
    "05 PM",
  ];

  //SELECT TIME
  const selectTimeForCall = (e, time) => {
    setSelectedTime(time);
    setFormBox(true);

    const liElements =
      e.target.parentElement.parentElement.querySelectorAll("li");

    liElements.forEach((li) => {
      li.classList.remove("!bg-[#589c13]");
      li.classList.remove("!text-[#fff]");
    });

    e.target.parentElement.classList.add("!bg-[#589c13]");
    e.target.parentElement.classList.add("!text-[#fff]");

    setTimeout(() => {
      formField.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const disableDates = (date) => {
    if (!today) return false; // Guard against undefined `today`
    const disabledUntil = new Date(today);
    disabledUntil.setDate(today.getDate() + 6);

    return (
      differenceInCalendarDays(date, today) < 0 ||
      differenceInCalendarDays(date, today) > 15 ||
      differenceInCalendarDays(date, today) <= 7 ||
      isWeekend(date)
    );
  };

  const selectDayForCall = (e) => {
    timesRef.current?.scrollIntoView({ behavior: "smooth" });
    setSelectedDate(e);
    setTimeBox(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Format the date if it's a Date object
      const formattedDate = selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : null;

      const emailResponse = await fetch("/api/scheduleCallFormMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          modeMeeting,
          selectedDate: formattedDate,
          selectedTime,
        }),
      });

      if (emailResponse.ok) {
        setShowModal(false);
        router.push("/thankyou-schedule-call");
      } else {
        const emailErrorResponse = await emailResponse.json();
        console.error("Failed to send email", emailErrorResponse);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full mx-auto relative z-10 grid gap-2">
        <div className="text-center mb-8">
          <h3 className="text-[2rem] leading-tight mb-2 text-white">
            Schedule a Call
          </h3>
          <p className="md:text-[1rem] text-[1rem]  text-white">
            Please pick your convenient date.
          </p>
        </div>
        <div className="grid card card-effect rounded-[30px]">
          <div className="lg:flex justify-between">
            <div className="w-full">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(setSelectedDate) =>
                  selectDayForCall(setSelectedDate)
                }
                disabled={disableDates}
              />
            </div>
            <div
              ref={timesRef}
              className={`${!timeBox ? "hidden" : ""} ${theme === "dark" ? "border-[#fff] border-opacity-5" : ""
                } w-full lg:border-l`}>
              <div
                className={`${theme === "dark" ? "border-[#fff] border-opacity-5" : ""
                  } text-center text-[1rem] sm:p-[18px] p-3 border-b `}>
                <p className="m-0">Choose a time</p>
              </div>
              <div className="sm:p-10 p-5">
                <ul className="grid grid-cols-2 gap-3">
                  {times.map((time, key) => (
                    <li
                      key={key}
                      onClick={(e) => selectTimeForCall(e, time)}
                      className="cursor-pointer switch p-[10px] rounded-md text-center">
                      <p className="text-[14px]">{time}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${!formBox ? "hidden" : ""
              } w-full border-t border-[#fff] border-opacity-5`}>
            <div
              className={`${theme === "dark" ? "border-[#fff] border-opacity-5" : "border"
                } text-center text-[1rem] sm:p-[18px] p-3 border-b `}>
              <p className="m-0">Contact Details</p>
            </div>
            <div className="sm:p-10 p-5">
              <div className="grid sm:gap-4 gap-3 mt-5" ref={formField}>
                <input
                  className="input-custom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                />
                <input
                  className="input-custom"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
                <PhoneInput
                  className="input-custom phone-input"
                  placeholder="Phone"
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="AE"
                  required
                />
                <textarea
                  rows="4"
                  className="input-custom"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe the business challenge you would like to discuss"
                  name="message"
                ></textarea>
                <p>Your preferred mode of meeting</p>
                <div
                  className={`${theme === "dark"
                      ? "border-[#fff] border-opacity-5 text-white"
                      : "border"
                    } grid gap-5 w-full rounded-3  border sm:p-5 p-4  bg-transparent rounded-md `}>
                  <div className="flex items-center">
                    <input
                      required
                      type="radio"
                      name="modeofmeeting"
                      value="Phone Call"
                      onChange={(e) => setModeMeeting(e.target.value)}
                      className="w-4 h-4 text-sky-500 border border-opacity-20 border-white bg-transparent focus:ring-sky-500 dark:focus:ring-sky-600"
                    />
                    <label className="ms-2">Phone call</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      required
                      type="radio"
                      name="modeofmeeting"
                      value="Microsoft teams"
                      onChange={(e) => setModeMeeting(e.target.value)}
                      className="w-4 h-4 text-sky-500 border border-opacity-20 border-white bg-transparent focus:ring-sky-500 dark:focus:ring-sky-600"
                    />
                    <label className="ms-2">Microsoft teams</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      required
                      type="radio"
                      name="modeofmeeting"
                      value="Face to Face Meeting( only in UAE)"
                      onChange={(e) => setModeMeeting(e.target.value)}
                      className="w-4 h-4 text-sky-500 border border-opacity-20 border-white bg-transparent focus:ring-sky-500 dark:focus:ring-sky-600"
                    />
                    <label className="ms-2">Face to Face Meeting (only in UAE)</label>
                  </div>
                </div>
              </div>
              <div className="btn-sc mt-[20px]">
                <button
                  title="Submit"
                  aria-label="Submit"
                  type="submit"
                  className="items-center flex">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <small className="block text-center p-3 text-white">
          Dubai Standard Time
        </small>
      </div>
    </form>
  );
}
