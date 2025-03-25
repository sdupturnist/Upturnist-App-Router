"use client";

import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";

import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function OfferForm() {
  const router = useRouter();

  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [place, setPlace] = useState('');
    const [website, setWebsite] = useState('');

  const { setShowModal } = useModalContext();
  const { theme } = useThemeContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email notification
      const emailResponse = await fetch("/api/offerFormMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, place, website }),
      });

      if (emailResponse.ok) {
        // setStatus("Email sent successfully!");
        //console.log("success");
        setShowModal(false);
        router.push("/thankyou-offer");
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
          <h3 className="heading-4">Help us Providing Minimum Details about your business!
          </h3>
              <div className="grid gap-5 ">
                           <div className="grid gap-4 mt-5">
                            {/* <span className="lg:text-[3rem] lg:text-[2.5rem] sm:text-[2rem] text-[2rem] leading-tight"> */}
                            {/* Our Guarantee; No SPAM and your data is safe with us! */}
                            {/* </span> */}
                            <div className="grid sm:gap-4 gap-3 mt-5">
                                <input
                                    className="input-custom"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    //onBlur={changeValidate}
                                    type="text"
                                    placeholder="Website"
                                    name="website"
                                    required
                                />
                              
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
                                    value={place}
                                    onChange={(e) => setPlace(e.target.value)}
                                    //onBlur={changeValidate}
                                    type="text"
                                    placeholder="Place"
                                    name="place"
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
                             
                                <PhoneInput
                          
                                       className="input-custom phone-input"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={setPhone}
                                    defaultCountry="AE"
                                    required
                                />
                              
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
