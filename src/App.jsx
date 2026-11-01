import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // URL PDF (Pastikan file TATA ACARA NATAL.pdf ada di folder public)
  const pdfFileName = "TATA ACARA NATAL.pdf";
  const pdfLocation = `/${encodeURI(pdfFileName)}`;

  useEffect(() => {
    // Karena tidak pakai persen, kita atur waktu loading statis (misal 3.5 detik)
    // agar animasi mental-mentalnya sempat terlihat oleh pengguna.
    const timer = setTimeout(() => {
      setFadeOut(true);

      // Hapus loader dari layar setelah efek memudar selesai
      setTimeout(() => {
        setShowLoader(false);
      }, 800);

    }, 3500); // 3500 ms = 3.5 detik durasi loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">

      {/* --- LAYAR LOADER (MINIMALIS & BERSIH) --- */}
      {showLoader && (
        <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>

          {/* Logo Bouncing (Mental-Mental) */}
          <div className="logo-container">
            <img src="/Logo.png" alt="Logo GKPI" className="logo-image" />
            {/* Bayangan di bawah logo untuk ilusi jarak saat melompat */}
            <div className="logo-shadow"></div>
          </div>

          {/* Teks Elegan */}
          <div className="text-container">
            <h1 className="title-text">Selamat Natal</h1>
            <h2 className="subtitle-text">Teman-Teman GKPI Immanuel</h2>
          </div>

          {/* Animasi Titik Bouncing (Pengganti Persentase) */}
          <div className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>

        </div>
      )}

      {/* --- TAMPILAN PDF (Responsive, 1 Slide, Anti-Goyang) --- */}
      {!showLoader && (
        <div className="pdf-wrapper">
          <iframe
            src={`${pdfLocation}#toolbar=0&navpanes=0&scrollbar=0&view=Fit&pagemode=none`}
            title="Tata Acara Natal GKPI"
            className="pdf-frame"
            scrolling="no"
          />
        </div>
      )}

    </div>
  );
};

export default App;   