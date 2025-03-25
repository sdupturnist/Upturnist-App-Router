'use client'


import { useModalContext } from '@/context/modalContext';
import React, { useState, useEffect, useRef } from 'react';
import Button from './Buttons';
import { useThemeContext } from '@/context/themeContext';
import { CheckBadgeIcon } from "@heroicons/react/24/outline";


export default function Packages({ type, title, packages, content, viewMore }) {


    const { setModalFor, setShowModal, setModalData, setIsClassAdded } = useModalContext()
    const {theme} = useThemeContext()


    const jsonArray = packages && JSON.parse(packages.features);


    const [isVisible, setIsVisible] = useState(true);
    const [windowWidth, setWindowWidth] = useState(null);

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
            setIsVisible(window.pageYOffset <= 500); // hide the div if scrolled down
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



    const selectedPackageRef = useRef(null);


    const openPackageBookModal = () => {

        const packageValue = selectedPackageRef.current.dataset.package;

        setShowModal(true)
        setModalFor('package')
        setModalData(packageValue)
        setIsClassAdded(true)

    };





    return (<>


        {type !== 'mini' ?
            <ul className="list-unstyled box-package- list-none">
                <li className="item- card card-effect sm:rounded-[30px] text-start package_new relative  rounded-[30px] !border-b-0" data-package={title} ref={selectedPackageRef}>

                    <div className={`${theme === 'dark' ? 'backdrop-blur-sm border !border-[#ffffff0d]' : 'bg-white border-b'} bg-box-package p-[30px] grid gap-[20px] sticky top-0 transition-all rounded-[30px] rounded-b-none`}>
                        <div>
                            <h4 className="text-[24px]">{title}</h4>
                            <small className="block opacity-55">Package</small>
                            <p className="mt-[10px]">{packages.subHeading}</p>
                        </div>
                        <div>
                        <Button
                        size="normal"
                        label={`Starting at AED ${packages.price}`}
                        icon={false}
                         action={openPackageBookModal}
                      />
                        </div>
                    </div>

                    <div className="p-[30px] border-t border-[#f9fafb1a]">
                        <small className="block mb-[15px] text-[14px] opacity-55">Key Benefits</small>
                        <p className="list-brief" dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                    <div className={`${viewMore} border-t border-[#f9fafb1a] overflow-hidden`}>
                        <small className="block mb-[15px] text-[14px] opacity-55 mx-[30px] mt-[16px]">Features</small>
                        <ul className="list-unstyled">
                            {jsonArray && jsonArray.map((item, key) => {
                                return (
                                    <li
                                        key={key}
                                        className={`flex justify-between px-[30px] py-[16px] ${key === jsonArray.length - 1 ? '' : 'border-b border-[#f9fafb1a] border-dotted'}`}
                                    >
                                        <p className={`${item.value === 'x' ? 'opacity-[0.4]' : ''} w-[90%]`}>
                                            {item.value} - {item.label}
                                        </p>
                                        <div className='item-flex'>
                                            {item.value !== 'x' ? (
                                                <CheckBadgeIcon
                                                className="max-w-4 max-h-4 min-w-4 min-h-4"
                                                />
                                            ) : null}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                    {/* <div className="package-full-desc p-[24px] grid gap-[7px] [&>*]:block" dangerouslySetInnerHTML={{ __html: desc }} /> */}
                </li>
            </ul>

            :
            <ul className="list-unstyled box-package- list-none" >
                <li className="item- card card-effect sm:rounded-[30px] rounded-[16px] overflow-hidden text-start" data-package={title} ref={selectedPackageRef}>
                    <div className="inner-3 bg-price-package">
                        <div className="inner-4 ">
                            <h4 >{title}</h4>
                            <span className="package-label- ">Package</span>
                            <span className="sub-heading-- ">{packages.subHeading}</span>
                        </div>

                    </div>
                    <div className="bg-sky-900 bg-opacity-35 p-[15px]">Key Benefits</div>
                    <div className="key--data-2 list-content-package" dangerouslySetInnerHTML={{ __html: content }} />

                    <div className="wrpr-4 ">
                    <Button
                        size="normal"
                        label={`Starting at AED ${packages.price}`}
                        icon={false}
                        data-package={title}
                        action={openPackageBookModal}
                      />
                    </div>

                </li>
            </ul>
        }
    </>)
}