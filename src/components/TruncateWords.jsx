import React from 'react';

// Function to truncate text and append ellipsis if needed
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }

  // Find the last space within the maxLength limit to avoid cutting words in half
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0 ? text.slice(0, lastSpaceIndex) + '...' : text.slice(0, maxLength) + '...';
};

// TruncatedText Component
const TruncatedText = ({ text, maxLength }) => {
  const truncated = truncateText(text, maxLength);

  return (
    truncated
  );
};

export default TruncatedText;
