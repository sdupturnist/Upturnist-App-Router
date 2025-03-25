"use client";

import React, { useState, useEffect } from "react";
import {
  wordpressGraphQlApiUrl,
  frontendUrl,
  siteEmail,
  siteFromEmail,
} from "../../utils/variables";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";

export default function PackageBookingForm({ data }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(data);

  const { setShowModal } = useModalContext();
  const { theme } = useThemeContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email notification
      const emailResponse = await fetch("/api/packageBookingFormMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, companyName, phone, website, description, selectedPackage }),
      });

      if (emailResponse.ok) {
        // setStatus("Email sent successfully!");
        //console.log("success");
        setShowModal(false);
        router.push("/thankyou-packages");
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
       <div className={`${theme === "dark" && "card-effect"} card sm:rounded-[30px] sm:p-[40px] p-[24px]`}>
        <h3 className="sub-heading sm:mb-[24px] mb-[16px]">
          Delighted by {data.length === 0 ? "Startup" : data} package? Get in
          Touch by Completing the Form Below.
        </h3>

        <div>
          <div className="grid gap-5">
            <div className="grid sm:gap-4 gap-3 mt-2">
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
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                //onBlur={changeValidate}
                type="text"
                placeholder="Company Name"
                name="company_name"
                required
              />
            

              <input
               className="input-custom"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                //onBlur={changeValidate}
                type="text"
                placeholder="Website"
                name="website"
              />
             
              <PhoneInput
                className="input-custom"
                placeholder="Phone"
                value={phone}
                onChange={setPhone}
                defaultCountry="AE"
                required
              />
             
              <textarea
              className="input-custom"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                name="description"
                rows={4}></textarea>
            </div>
          </div>
          <div className="btn-sc mt-[20px]">
                    <button title="Submit" aria-label="Submit" type="submit" className="items-center flex">
                    Submit
                    </button>
</div>
        </div>
      </div>
    </form>
  );
}
