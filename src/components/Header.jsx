"use client";
import Link from "next/link";
import Logo from "./Logo";
import BlurAnimation from "./BlurAnimation";
import { motion, useScroll, useViewportScroll } from "framer-motion";
import { useModalContext } from "@/context/modalContext";
import { useState, useEffect, use } from "react";
import { useThemeContext } from "@/context/themeContext";
import { frontendUrl } from "@/utils/variables";
import Button from "./Buttons";
import { useSiteContext } from "@/context/siteContext";
import { MoonIcon, SunIcon, Bars2Icon } from "@heroicons/react/24/outline";
import SocialIcons from "./Social";

function Nav({ initialData, type, menu }) {
  const { setModalFor, setShowModal } = useModalContext();
  const { primaryMenu, contact } = useSiteContext();

  //THEME

  const { theme, toggleTheme } = useThemeContext();


  //TOGGLE MENU
  const [isOpen, setOpen] = useState(false);

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
    
  }

  

  useEffect(() => {
    return scrollY.onChange(() => update());
  });

  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.2 },
        y: { duration: 0.2 },
      },
    },
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        opacity: { duration: 0.2 },
        y: { duration: 0.2 },
      },
    },
  };

  //console.log(menu && menu.length)

  const openCallBackModal = () => {
    setShowModal(true);
    setModalFor("callback");
  };

  const FilteredCategories = () => {
    const [expandedItems, setExpandedItems] = useState({
      parent: null,
      child: {},
      sub: {},
    });

    const toggleItem = (level, id, parentId = null) => {
      setExpandedItems((prev) => {
        if (level === "parent") {
          return { ...prev, parent: prev.parent === id ? null : id };
        }
        if (level === "child") {
          return {
            ...prev,
            child: {
              ...prev.child,
              [parentId]: prev.child[parentId] === id ? null : id,
            },
          };
        }
        if (level === "sub") {
          return {
            ...prev,
            sub: {
              ...prev.sub,
              [parentId]: prev.sub[parentId] === id ? null : id,
            },
          };
        }
      });
    };

    // const groupedItems =
    //   menu &&
    //   menu.reduce((acc, item) => {
    //     const parentId = item.menu_item_parent || "0";
    //     if (!acc[parentId]) {
    //       acc[parentId] = [];
    //     }
    //     acc[parentId].push(item);
    //     return acc;
    //   }, {});

    const groupedItems =
      menu && menu.length > 0
        ? menu &&
          menu.reduce((acc, item) => {
            //console.log('main')
            const parentId = item.menu_item_parent || "0";
            if (!acc[parentId]) {
              acc[parentId] = [];
            }
            acc[parentId].push(item);
            return acc;
          }, {})
        : primaryMenu &&
          primaryMenu.reduce((acc, item) => {
            // console.log('inner')
            const parentId = item.menu_item_parent || "0";
            if (!acc[parentId]) {
              acc[parentId] = [];
            }
            acc[parentId].push(item);
            return acc;
          }, {});

    const renderItems = (items, level = 0, parentId = null) => {
      return (
        <ul className="list-ul-1 grid gap-[10px] sm:ml-[20px] mt-[10px]">
          {items.map((item) => (
            <li key={item.ID} className="ml-[20px] sm:mb-[4px]">
              {/* Parent item (Top level) */}
              {level === 0 ? (
                <div className="flex items-center">
                  <p
                    className="cursor-pointer flex items-center"
                    aria-label={item.post_title}
                    title={item.post_title}
                    onClick={() => toggleItem("parent", item.ID)} // Toggle parent item
                  >
                    {/* Toggle Arrow */}
                    <span
                      className={`mr-2 transition-transform ${
                        expandedItems.parent === item.ID ? "rotate-90" : ""
                      }`}>
                      ➤
                    </span>
                    {item.post_title}
                  </p>
                </div>
              ) : level === 1 ? (
                // Child item (second level)
                <div>
                  <p
                    className="cursor-pointer"
                    aria-label={item.post_title}
                    title={item.post_title}
                    onClick={() => toggleItem("child", item.ID, parentId)} // Toggle child item
                  >
                    {item.post_title}
                  </p>
                </div>
              ) : (
                // Sub-item (third level)
                item.url && (
                  <Link
                    onClick={() => setOpen(!isOpen)} // Assuming you have setOpen defined elsewhere
                    aria-label={item.post_title}
                    title={item.post_title}
                    href={`${frontendUrl}/${item?.acf?.slug}/`}>
                    {item.post_title}
                  </Link>
                )
              )}

              {level === 0 &&
                expandedItems.parent === item.ID &&
                groupedItems[item.ID]?.length > 0 &&
                renderItems(groupedItems[item.ID], 1, item.ID)}

              {level === 1 &&
                expandedItems.child[parentId] === item.ID &&
                groupedItems[item.ID]?.length > 0 &&
                renderItems(groupedItems[item.ID], 2, item.ID)}

              {level === 2 &&
                expandedItems.sub[parentId] === item.ID &&
                item.url && (
                  <Link
                    onClick={() => setOpen(!isOpen)} // Assuming you have setOpen defined elsewhere
                    aria-label={item.post_title}
                    title={item.post_title}
                    href={`${frontendUrl}${item?.acf?.slug}/`}>
                    {item.post_title}
                  </Link>
                )}
            </li>
          ))}
        </ul>
      );
    };

    return (
      <div>
        {primaryMenu &&
          groupedItems["0"]?.map((item) => (
            <div key={item.ID} className="mb-[8px]">
              {/* Render top-level items */}
              {item?.acf?.parent === false ? (
                <Link
                  href={`${frontendUrl}${item?.acf?.slug}/`}>
                  {item?.title}
                </Link>
              ) : (
                <p
                  className="cursor-pointer"
                  aria-label={item.title}
                  title={item.title}
                  onClick={() => toggleItem("parent", item.ID)} // Toggle parent item
                >
                  {item?.title}
                </p>
              )}
              {/* Render child items */}
              {expandedItems.parent === item.ID &&
                groupedItems[item.ID] &&
                groupedItems[item.ID].length > 0 &&
                renderItems(groupedItems[item.ID], 1, item.ID)}
              {/* Render child items recursively */}
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      {/* HEADER START */}
      <motion.header
        className={`${
          theme === "light" ? "bg-white" : "backdrop-blur-lg bg-primary"
        } header sticky`}
        variants={headerVariants}
        animate={hidden ? "hidden" : "visible"}>
       <div className="sm:px-8 px-4">
            <div className="inner---">
              {/* {theme} */}
              {theme === "dark" ? (
                <Logo
                  url={`${frontendUrl}/images/upturnist-logo.webp`}
                  alt="branding_consultancy_dubai_upturnist_logo"
                  logoTitle="branding_consultancy_dubai_upturnist_logo"
                  for_page={type}
                />
              ) : (
                <Logo
                  url={`${frontendUrl}/images/upturnist-logo-2.webp`}
                 alt="branding_consultancy_dubai_upturnist_logo"
                  logoTitle="branding_consultancy_dubai_upturnist_logo"
                  for_page={type}
                />
              )}
              <div className="wrpr--nav-1">
                <div className={`btn-sc`}>
                  <button
                    className="cursor-pointer size-[60px] !p-0"
                    onClick={toggleTheme}>
                    {theme === "dark" && (
                      <SunIcon className="max-w-5 max-h-5 min-w-5 min-h-5" />
                    )}

                    {theme === "light" && (
                      <MoonIcon className="max-w-5 max-h-5 min-w-5 min-h-5" />
                    )}
                  </button>
                </div>
                {type == "normal" ? (
                  <>
                    <div className="sm:flex hidden">
                      <Button
                        size="normal"
                        label="Schedule a Call"
                        icon={false}
                        action={openCallBackModal}
                      />
                    </div>
                    <div className="btn-sc">
                      <button
                        title="Open Menu"
                        aria-label="Open Menu"
                        type="button"
                        onClick={() => setOpen(!isOpen)}
                        className="!p-0">
                        {theme === "light" && (
                          <svg
                            className="cursor-pointer size-[20px]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 26 10">
                            <g
                              id="Group 12"
                              stroke="#000"
                              strokeLinecap="round"
                              strokeWidth="2">
                              <path id="Line 2" d="M7 1.346h18" />
                              <path id="Line 3" d="M1 8.346h17" />
                            </g>
                          </svg>
                        )}
                        {theme === "dark" && (
                          <svg
                            className="cursor-pointer size-[20px]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 26 10">
                            <g
                              id="Group 12"
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeWidth="2">
                              <path id="Line 2" d="M7 1.346h18" />
                              <path id="Line 3" d="M1 8.346h17" />
                            </g>
                          </svg>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                <>
                  <div className="sm:flex hidden">
                  <Button
                    size="normal"
                    label="Schedule a Call"
                    icon={false}
                    action={openCallBackModal}
                  />
                </div>
                  <div className="btn-sc">
                    <button
                      title="Open Menu"
                      aria-label="Open Menu"
                      type="button"
                      onClick={() => setOpen(!isOpen)}
                      className="!p-0">
                      {theme === "light" && (
                        <svg
                          className="cursor-pointer size-[20px]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 26 10">
                          <g
                            id="Group 12"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeWidth="2">
                            <path id="Line 2" d="M7 1.346h18" />
                            <path id="Line 3" d="M1 8.346h17" />
                          </g>
                        </svg>
                      )}
                      {theme === "dark" && (
                        <svg
                          className="cursor-pointer size-[20px]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 26 10">
                          <g
                            id="Group 12"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeWidth="2">
                            <path id="Line 2" d="M7 1.346h18" />
                            <path id="Line 3" d="M1 8.346h17" />
                          </g>
                        </svg>
                      )}
                    </button>
                  </div>
                </>
                )}
              </div>
            </div>
          </div>
      </motion.header>
      {/* HEADER END */}
      {/* MOBILE MENU */}
      <div className={`header-nav-wrpr  ${isOpen ? "show-nav" : "hidden-nav"}`}>
        <div
          className={`${
            theme === "dark" ? "backdrop-blur-xl" : "bg-white"
          } wrpr`}>
          <button
            title="Close Menu"
            aria-label="Close Menu"
            className="closeButton mb-10"
            onClick={() => setOpen(!isOpen)}>
            {theme === "light" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="black"
                viewBox="0 0 256 256">
                <path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"></path>
              </svg>
            )}
            {theme === "dark" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#dcf4ff"
                viewBox="0 0 256 256">
                <path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"></path>
              </svg>
            )}
          </button>
          <div className="nav-wrpr--">
            <div className="col- grid gap-[10px]">
              <span className="label--">MENU</span>
              {FilteredCategories()}
            </div>
            <div>
              <span className="label--">CONTACT</span>
              <div className="col--2">
                <p
                  className="p-1--"
                  dangerouslySetInnerHTML={{
                    __html: contact && contact.heading,
                  }}
                />
                <p
                  className="p-2--"
                  dangerouslySetInnerHTML={{
                    __html: contact && contact.address,
                  }}
                />
                {contact && (
                  <>
                    <Link
                      className="para"
                      aria-label="Phone"
                      href={`tel:${contact && contact.phone}`}>
                      {contact && contact.phone}
                    </Link>
                    <Link
                      className="para"
                      aria-label="Email"
                      href={`mailto:{contact.email && contact.email}`}>
                      {contact && contact.email}
                    </Link>
                  </>
                )}
                <SocialIcons classes="" social={contact && contact} />
              </div>
            </div>
          </div>
        </div>
        <BlurAnimation position="bottom left" />
      </div>
    </>
  );
}

export default Nav;
