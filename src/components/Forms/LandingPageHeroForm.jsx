"use client";

import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";

import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function HeroForm({ style, title }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { setShowModal } = useModalContext();
  const { theme } = useThemeContext();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email notification
      const emailResponse = await fetch("/api/landingPageHeroFormMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, country, companyName }),
      });

      if (emailResponse.ok) {
        // setStatus("Email sent successfully!");
        //console.log("success");
        setShowModal(false);
        router.push("/thankyou-schedule-call-lp");
      } else {
        const emailErrorResponse = await emailResponse.json();
        console.error("Failed to send email", emailErrorResponse);
        // setStatus("Failed to send email");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`${
          theme === "dark" && "card-effect bg-primary"
        } card !rounded-[16px] ${style} sm:p-[34px] p-[24px]`}>
        <p className="text-[14px] font-semibold mb-[10px] !leading-[1.5em]">
          {title && title}
        </p>
        <div className="grid gap-5 ">
          <div className="grid gap-4 mt-[16px]">
            <div className="grid sm:gap-4 gap-3">
              <input
                className="input-custom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                //onBlur={changeValidate}
                type="text"
                placeholder="Full Name"
                name="name"
                required
              />

              <input
                className="input-custom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // onBlur={changeValidate}
                type="email"
                placeholder="Email"
                name="email"
                required
              />

              <input
                className="input-custom"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                // onBlur={changeValidate}
                type="text"
                placeholder="Company Name"
                name="companyname"
                required
              />

              <CountrySelect
                onChange={(e) => setCountry(e.name)}
                placeHolder="Country"
                required
              />
            </div>
        <div>
        <div className="btn-sc mt-[10px] w-full" style={{
          width: '100%'
        }}>
              <button
                title="Submit"
                aria-label="Submit"
                type="submit"
                className="items-center flex w-full">
                Ok, Book my FREE Session!
              </button>
            </div>
        </div>
   <small className="text-[12px] opacity-45 block mt-[10px]">
              * This is a no-obligation, commitment-free session.
            </small>
          </div>
        </div>
      </div>
    </form>
  );
}
