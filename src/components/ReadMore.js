"use client";
import Button from "@/components/Buttons";
import { useState, useEffect } from "react";

const ReadMore = ({ children, maxLength, btnpos, inMobile }) => {
  // Function to count words
  function countWords(paragraph) {
    if (typeof paragraph !== "string") return 0; // Return 0 if paragraph is not a string
    const words = paragraph.trim().split(/\s+/);
    return words.length;
  }

  // Function to truncate the content based on the maxLength
  function truncateContent(content, maxLength) {
    if (typeof content !== "string") return ""; // Return empty string if content is not a string
    const words = content.trim().split(/\s+/);
    if (words.length <= maxLength) return content; // No need to truncate
    return words.slice(0, maxLength).join(" ") + "..."; // Truncate and add ellipsis
  }

  const [isReadMore, setIsReadMore] = useState(false); // Initially show the truncated content
  const [isMobile, setIsMobile] = useState(false); // State to track mobile screen size

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore); // Toggle between full and truncated content
  };

  // Convert content into HTML, if it contains special characters like &nbsp;
  const convertToHtml = (content) => {
    if (typeof content !== "string") return ""; // Return empty string if content is not a string
    const parts = content.split(/&nbsp;/).map((part) => {
      const trimmedPart = part.trim();
      if (/<(ul|ol)>/.test(part)) {
        return part.trim();
      }
      if (trimmedPart) {
        return `${trimmedPart}`;
      }
      return "";
    });
    return parts.join("");
  };

  const content = typeof children === "string" ? convertToHtml(children) : children;

  // Calculate word count
  const wordCount = countWords(content);

  // Truncate content if the word count exceeds maxLength
  const truncatedContent = truncateContent(content, maxLength);

  // Handle window resizing to detect mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 575); // Check if the screen size is below 575px
    };

    handleResize(); // Initial check on mount
    window.addEventListener("resize", handleResize); // Add event listener to handle window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
    };
  }, []);

  // If `inMobile` prop is true, apply Read More logic only below 575px
  if (inMobile && !isMobile) {
    return (
      <div
        className="overflow-hidden transition-all [&>*]:mb-[20px] duration-300"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    );
  }

  // If word count exceeds maxLength, show Read More button
  return wordCount > maxLength ? (
    <div className="mt-[10px] more-content">
      <div
        className="readmore-content overflow-hidden transition-all [&>*]:mb-[20px] duration-300"
        dangerouslySetInnerHTML={{
          __html: isReadMore ? content : truncatedContent,
        }}
      />
      <button
        onClick={toggleReadMore}
        className={`${btnpos === "center" ? "mx-auto" : ""} btn btn-normal`}
      >
        {isReadMore ? "Show Less" : "Read More"}
      </button>
    </div>
  ) : (
    <div
      className="readmore-content overflow-hidden transition-all [&>*]:mb-[20px] duration-300"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default ReadMore;