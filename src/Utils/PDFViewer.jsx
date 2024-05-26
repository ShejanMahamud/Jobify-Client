import React from 'react';

const PDFViewer = ({ pdfUrl }) => {
    const embedUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

    return (
      <div>
        <iframe src={embedUrl} width="100%" height="600px" title="PDF viewer"></iframe>
      </div>
    );
  };

export default PDFViewer;
