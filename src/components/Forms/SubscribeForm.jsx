"use client";

import React, { useState } from "react";
import "react-phone-number-input/style.css";

import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";

export default function SubscribrForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const { setShowModal } = useModalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email notification
      const emailResponse = await fetch("/api/subscribeFormMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (emailResponse.ok) {
        // setStatus("Email sent successfully!");
        //console.log("success");
        setSuccess(true);
        setEmail('')
      } else {
        const emailErrorResponse = await emailResponse.json();
        console.error("Failed to send email", emailErrorResponse);
        // setStatus("Failed to send email");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
  
      // router.push("/thankyou");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="heading-4">
        Join our community to learn the latest trends and insights in Branding
        and Digital Marketing.
      </h2>
      <p className="mt-[24px]">We assure no Spam, One email in a month!</p>
      <div className="grid gap-5 sm:mt-[16px] mt-[8px] mb-[8px]">
        <div className="flex gap-4 mt-[16px] card justify-between rounded-full overflow-hidden max-w-[450px]">
          <div className="grid">
            <input
              className="w-full h-full !border-0 focus:border-0 px-[20px] bg-transparent p-[16px] !text-[14px] subscribe-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // onBlur={changeValidate}
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <button
            title="Submit"
            aria-label="Submit"
            type="submit"
            className="items-center flex btn px-[20px]"
            style={{
              borderRadius: 0,
            }}>
            Subscribe
          </button>
        </div>
        {success &&  <p data-aos="fade-up" className="text-green-700 mt-[20px] text-[14px] leading-5 bg-green-100 bg-opacity-50 sm:text-center text-start p-[12px] rounded-md">We appreciate your subscription with us!</p>}
    </div>
    </form>
  );
}
