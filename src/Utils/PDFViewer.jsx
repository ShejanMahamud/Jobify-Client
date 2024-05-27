import React from 'react';

const PDFViewer = ({url}) => {

  const getPreviewUrl = (url) => {
    if (!url) return null;
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return null;
  };
  const previewUrl = getPreviewUrl(url);

  return (
    <iframe
            src={previewUrl}
            className="w-full min-h-screen"
            allow="autoplay"
          ></iframe>
  )
}

export default PDFViewer