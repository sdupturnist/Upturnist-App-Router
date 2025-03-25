"use client";

import Images from "../Images";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";

export default function HeroForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [website, setWebsite] = useState("");
  //const [status, setStatus] = useState("");

  const { setShowModal } = useModalContext();
  const { theme } = useThemeContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email notification
      const emailResponse = await fetch("/api/heroFormMail", {
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
        router.push("/thankyou");
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
        className={`${theme === "dark" && "card-effect"} card sm:rounded-[30px] sm:p-[40px] p-[24px]`}>
          <div className="sm:mb-[16px] mb-[8px] grid gap-[10px]">
          <h3 className="sm:text-[28px] text-[24px]">
        Fill Out the Form & We’ll Reach Out to You!
        </h3>
        <p>Our Guarantee; No SPAM and your data is safe with us!</p>
          </div>
         <div>
          <div className="grid gap-5 ">
            <div className="grid gap-4 mt-5">
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
                    <button title="Submit" aria-label="Submit" type="submit" className="items-center flex" >
                    Submit
                    </button>
</div>
        </div>
      </div>
    </form>
  );
}
