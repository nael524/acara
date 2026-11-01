import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './App.css';

// Konfigurasi wajib react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  // File PDF Anda
  const pdfFileName = "TATA ACARA NATAL.pdf";
  const pdfLocation = `/${encodeURI(pdfFileName)}`;

  // Efek Loading (Mental-mental) selama 3.5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowLoader(false), 800);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Responsif: Sesuaikan ukuran kertas PDF jika layar HP/Laptop diubah
  useEffect(() => {
    const handleResize = () => setPageWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="app-container">

      {/* =========================================
          LAYAR LOADER (PUTIH BERSIH & ANIMASI JELI)
          ========================================= */}
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

      {/* =========================================
          PDF VIEWER (MODE SWIPE / SCROLL)
          ========================================= */}
      {!showLoader && (
        <div className="custom-pdf-wrapper">

          {/* Header Berbayang Lembut Saat Scroll */}
          <div className="glass-header">
            <span className="header-title">Tata Ibadah Natal</span>
            <span className="header-subtitle">GKPI Immanuel</span>
          </div>

          <Document
            file={pdfLocation}
            onLoadSuccess={onDocumentLoadSuccess}
            className="pdf-document-container"
            loading={
              <div className="loading-pdf-container">
                <div className="dot"></div><div className="dot"></div><div className="dot"></div>
              </div>
            }
          >
            {/* Merender semua halaman agar bisa di-swipe ke bawah */}
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="pdf-page-wrapper">

                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="pdf-page-shadow"
                  // Ukuran responsif: Layar besar = 600px, Layar HP = full screen dikurangi margin 32px
                  width={pageWidth > 768 ? Math.min(pageWidth * 0.5, 600) : pageWidth - 32}
                />

                {/* Lencana Halaman Premium */}
                <div className="page-badge">
                  Halaman {index + 1} / {numPages}
                </div>

              </div>
            ))}
          </Document>
        </div>
      )}

    </div>
  );
};

export default App;