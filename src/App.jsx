import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './App.css';

// Gunakan worker lokal dari node_modules agar lebih stabil & cepat (tanpa bergantung CDN unpkg)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [pdfError, setPdfError] = useState(null);

  const pdfFileName = "TATA ACARA NATAL.pdf";
  const pdfLocation = `/${encodeURI(pdfFileName)}`;

  // Efek Loading selama 3.5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowLoader(false), 800);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Responsif ukuran layar
  useEffect(() => {
    const handleResize = () => setPageWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Detail error PDF:", error);
    setPdfError("Gagal memuat dokumen tata ibadah. Silakan muat ulang halaman.");
  };

  return (
    <div className="app-container">
      {/* LAYAR LOADER */}
      {showLoader && (
        <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
          <div className="logo-container">
            <img src="/Logo.png" alt="Logo GKPI" className="logo-image" />
            <div className="logo-shadow"></div>
          </div>

          <div className="text-container">
            <h1 className="title-text">Selamat Natal</h1>
            <h2 className="subtitle-text">Teman-Teman GKPI Immanuel</h2>
          </div>

          <div className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}

      {/* PDF VIEWER: Tetap di-mount di latar belakang agar siap tampil begitu loader hilang */}
      <div
        className="custom-pdf-wrapper"
        style={{ display: showLoader ? 'none' : 'block' }}
      >
        <div className="glass-header">
          <span className="header-title">Tata Ibadah Natal</span>
          <span className="header-subtitle">GKPI Immanuel</span>
        </div>

        {pdfError ? (
          <div className="loading-pdf-container">
            <p>{pdfError}</p>
          </div>
        ) : (
          <Document
            file={pdfLocation}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="pdf-document-container"
            loading={
              <div className="loading-pdf-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            }
          >
            {numPages &&
              Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="pdf-page-wrapper">
                  <Page
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="pdf-page-shadow"
                    width={pageWidth > 768 ? Math.min(pageWidth * 0.5, 600) : pageWidth - 32}
                  />
                  <div className="page-badge">
                    Halaman {index + 1} / {numPages}
                  </div>
                </div>
              ))}
          </Document>
        )}
      </div>
    </div>
  );
};

export default App;