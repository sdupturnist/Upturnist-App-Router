"use client";

import Images from "../Images";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";

export default function DownloadFormHome() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const downloadFile = "https://demo.upturnist.com/wp-content/uploads/2024/11/download.pdf"
  //const [status, setStatus] = useState("");

  const { setShowModal } = useModalContext();
  const { theme } = useThemeContext();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send email notification to admin
      const emailResponse = await fetch("/api/downloadFormHomeMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
  
      // Send file to the user
      const emailResponseToUser = await fetch("/api/downloadFormFileSendToUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, downloadFile }),
      });
  
      // Check if both responses are successful
      if (emailResponse.ok && emailResponseToUser.ok) {
        // Both emails were sent successfully
        // You can set the status or update the UI here
        // setStatus("Emails sent successfully!");
        router.push("/thankyou-download");
        setName("");
        setEmail("");
        console.log("Emails sent successfully.");
      } else {
        // If either response fails, check which one and handle accordingly
        if (!emailResponse.ok) {
          const emailErrorResponse = await emailResponse.json();
          console.error("Failed to send admin email", emailErrorResponse);
          // setStatus("Failed to send admin email");
        }
        if (!emailResponseToUser.ok) {
          const emailErrorResponseToUser = await emailResponseToUser.json();
          console.error("Failed to send user email", emailErrorResponseToUser);
          // setStatus("Failed to send user email");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // setStatus("An unexpected error occurred");
    } finally {

     // setSuccess(true);
   
    }
  };

  



  return (
    <form onSubmit={handleSubmit}>
      <div
       >
   
        <div>
          <div>
          

            <div className="grid sm:gap-4 gap-3 sm:mt-[8px]">
              <input
                className="input-custom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                //onBlur={changeValidate}
                type="text"
                placeholder="Name"
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
            <div className="btn-sc mt-[20px]">
              <button
                title="Submit"
                aria-label="Submit"
                type="submit"
                className="items-center flex">
                Submit
              </button>
            </div>
            {success &&  <p data-aos="fade-up" className="text-green-700 mt-[20px] text-[14px] leading-5 bg-green-100 bg-opacity-50 sm:text-center text-start p-[12px] rounded-md">Thank you for downloading. Please check your email to complete the download.</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
