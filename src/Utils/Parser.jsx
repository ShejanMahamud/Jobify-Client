import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';

const Parser = ({ text }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(text);
    setDescription(sanitizedHtml);
  }, [text]);

  return (
    <div dangerouslySetInnerHTML={{ __html: description }} />
  );
};

export default Parser;
