"use client";

import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  //const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email notification
      const emailResponse = await fetch("/api/contactMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, place, email, phone, message }),
      });

      if (emailResponse.ok) {
       // setStatus("Email sent successfully!");


       router.push("/thankyou-contact");
       //setSuccess(true);
       setName("");
       setPlace("");
       setEmail("");
       setPhone("");
       setMessage("");

       
      console.log("success");
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
      <div className="card card-effect rounded-[30px] lg:px-[90px] sm:px-[70px] sm:py-[70px] p-[30px]">
        <h2 className="text-center heading-4 mb-[4px]">
          What can we help you with?
        </h2>
        <small className="text-center block">
          Drop us a few lines and we&apos;ll get back to you
        </small>
        <div className="mt-[20px] sm:mt-[40px] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              className="input-custom w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              name="name"
              required
            />
          </div>

          <div>
            <input
              className="input-custom w-full"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              type="text"
              placeholder="Place"
              name="place"
              required
            />
          </div>
          <div>
            <input
              className="input-custom w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div>
            <PhoneInput
              className="input-custom phone-input w-full"
              placeholder="Phone"
              value={phone}
              onChange={setPhone}
              defaultCountry="AE"
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <textarea
              rows="4"
              className={`input-custom w-full`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              name="message"></textarea>
          </div>
          <small className="col-span-1 sm:col-span-2">
            Now your personal data will go immediately to Upturnist! We promise
            to take good care of them.
          </small>
        </div>

        <div>
          <div className="btn-sc mt-[20px]">
            <button
              title="Submit"
              aria-label="Submit"
              type="submit"
              className="items-center flex">
              Submit
            </button>
          </div>

          {success && (
            <p data-aos="fade-up" className="text-green-700 mt-[20px] text-[14px] leading-5 bg-green-100 bg-opacity-50 sm:text-center text-start p-[12px] rounded-md">
              Thank you for contacting us. We&apos;ll get back to you very soon
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
