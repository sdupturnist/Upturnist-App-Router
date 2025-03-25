"use client";

import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";

import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function LandingPageSubscribeForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { setShowModal } = useModalContext();
  const { theme } = useThemeContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email notification
      const emailResponse = await fetch("/api/landingPageSubscribeFormMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (emailResponse.ok) {
        // setStatus("Email sent successfully!");
        setShowModal(false);
        router.push("/thankyou-subscribe");
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
          theme === "dark" && "card-effect"
        } card sm:rounded-[30px] sm:p-[40px] p-[24px]`}>
        <p className="text-[18px] font-bold mb-[10px]">Subscribe</p>
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
            </div>

            <div className="btn-sc">
              <button
                title="Submit"
                aria-label="Submit"
                type="submit"
                className="items-center flex">
                Ok, get me a copy
              </button>
            </div>

            <small className="text-[12px] opacity-45 block mt-[10px] pb-[30px]">
              Your email is safe with us; we won’t share it.
            </small>
          </div>
        </div>
      </div>
    </form>
  );
}
