"use client";

import { useModalContext } from "@/context/modalContext";
import React, { useState, useEffect } from "react";
import Button from "./Buttons";
import { useThemeContext } from "@/context/themeContext";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";


export default function ComparePackages({ data }) {
    const { setModalFor, setShowModal, setModalData, setIsClassAdded } = useModalContext()
  const { theme } = useThemeContext();

  const [isVisible, setIsVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(null);

  const [currentBox, setCurrentBox] = useState(1);



  const handleBoxChange = (boxNumber, item) => {
   setCurrentBox(boxNumber);
    setModalData(item)

  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth); // set initial width
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset <= 0); // hide the div if scrolled down
    };
    if (windowWidth && windowWidth > 1199) {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsVisible(true); // Show the div when width is not available or greater than 575px
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [windowWidth]);

  const openPackageBookModal = () => {
   

    
    setShowModal(true)
    setModalFor('package')
   
    setIsClassAdded(true)
  };

  return (
    <>
      <div className="compare-package m-0">
        <div className="flex my-[30px] gap-[10px] rounded-md overflow-hidden">
          {data.map((item, key) => {
            return (
           
              <Button
                key={key}
                size="small"
                label={item.title}
                icon={false}
                action={(e) => handleBoxChange(key + 1, item.title)}
                classes={`${
                  currentBox === key + 1 ? "active-button" : ""
                } w-full !block !text-center items-center`}
              />
            );
          })}
        </div>

        {data.map((item, key) => {
          return (
            <>
              <div key={key}>
                <div
                  className={`${
                    theme === "dark"
                      ? "backdrop-blur-sm border border-opacity-10 border-white"
                      : "bg-white border"
                  } pb-[40px] bg-box-package grid gap-[20px] sticky top-0 transition-all rounded-[30px]`}
                  style={{
                    display: currentBox === key + 1 ? "block" : "none",
                  }} >
                  <div
                    className={`${
                      theme === "dark"
                        ? "backdrop-blur-sm !border-[#ffffff0d]"
                        : "bg-white border-b"
                    } bg-box-package p-[30px] transition-all rounded-[30px] rounded-b-none py-[70px] grid gap-[20px]`}>
                    <div>
                      <h3 className="heading-4 !m-0">{item.title}</h3>
                    </div>
                    <div>
                      <button
                        title={`Starting at AED ${item.packages.price}`}
                        aria-label={`Starting at AED ${item.packages.price}`}
                        onClick={openPackageBookModal}
                        className="btn btn-small">
                        Starting at AED {item.packages.price}
                      </button>
                    </div>
                  </div>
                  <ul className="list-unstyled mt-[30px]">
                    {JSON.parse(item.packages.features).map((item, key) => {
                      return (
                        <li
                          key={key}
                          className="flex justify-between px-[30px] py-[5px] text-[14px]">
                          <p
                            className={`${
                              item.value === "x" ? "opacity-[0.4]" : ""
                            } w-[90%] text-start`}>
                            {item.value} - {item.label}
                          </p>

                          <div className="item-flex">
                            {item.value !== "x" ? (
                              <>
                                <CheckBadgeIcon className="max-w-4 max-h-4 min-w-4 min-h-4" />
                              </>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="inner-5">
                    <button
                      title={`Starting at AED ${item.packages.price}`}
                      aria-label={`Starting at AED ${item.packages.price}`}
                      onClick={openPackageBookModal}
                      className="btn btn-normal m-[20px] text-center">
                      Starting at AED {item.packages.price}
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
