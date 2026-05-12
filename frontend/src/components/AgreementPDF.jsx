import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { HiOutlineDownload } from "react-icons/hi";

const AgreementPDF = ({ booking, user }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    if (!booking || !user) {
      console.warn("Missing booking or user data for PDF");
      return;
    }
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));

    const elementId = `agreement-${booking._id}`;
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error("PDF Element not found:", elementId);
      setIsGenerating(false);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            clonedElement.style.position = "static";
            clonedElement.style.display = "block";
            clonedElement.style.opacity = "1";
          }
        }
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Dhara_Agreement_${booking._id.slice(-6).toUpperCase()}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <button 
        onClick={downloadPDF}
        disabled={isGenerating}
        className={`flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-900/20 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        <HiOutlineDownload className="text-lg" /> 
        {isGenerating ? "Finalizing..." : "Download Agreement"}
      </button>

      {/* Hidden Agreement Template for PDF Generation */}
      <div style={{ position: 'absolute', left: '-10000px', top: '0', pointerEvents: 'none', zIndex: '-9999' }}>
        <div 
          id={`agreement-${booking._id}`}
          style={{ 
            width: '210mm', 
            padding: '80px', 
            backgroundColor: '#ffffff', 
            color: '#1a4d2e', 
            fontFamily: 'serif',
            lineHeight: '1.5',
            minHeight: '297mm',
            boxSizing: 'border-box',
            textAlign: 'left' // Force left alignment for everything
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '4px solid #f97316', paddingBottom: '30px', marginBottom: '40px', width: '100%', overflow: 'hidden', textAlign: 'left' }}>
            <div style={{ display: 'inline-block', width: '60%', verticalAlign: 'top', textAlign: 'left' }}>
              <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0', color: '#1a4d2e', letterSpacing: '-2px', textAlign: 'left' }}>DHARA</h1>
              <p style={{ color: '#f97316', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', margin: '5px 0 0 0', textAlign: 'left' }}>Fractional Farmland Ownership</p>
            </div>
            <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top', textAlign: 'right', fontSize: '14px', paddingTop: '10px' }}>
              <p style={{ fontWeight: 'bold', margin: '0' }}>Agreement ID: {booking._id?.slice(-8).toUpperCase()}</p>
              <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Date: {new Date(booking.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px', textDecoration: 'underline', textDecorationColor: '#fdba74', textTransform: 'uppercase', letterSpacing: '1px' }}>Farm Plot Lease & Cultivation Agreement</h2>

          <div style={{ fontSize: '18px', marginBottom: '40px', textAlign: 'left' }}>
            <p style={{ textAlign: 'left' }}>
              This Agreement is entered into on this <strong>{new Date(booking.createdAt || Date.now()).toLocaleDateString()}</strong> by and between:
            </p>

            <div style={{ marginTop: '30px', backgroundColor: '#f9fafb', padding: '30px', borderRadius: '24px', border: '1px solid #f3f4f6', width: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top', textAlign: 'left' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px', textAlign: 'left' }}>The Investor (Lessee)</p>
                <p style={{ fontWeight: '900', fontSize: '20px', margin: '0', textAlign: 'left' }}>{user?.name}</p>
                <p style={{ fontSize: '14px', color: '#4b5563', margin: '4px 0 0 0', textAlign: 'left' }}>{user?.email}</p>
                <p style={{ fontSize: '14px', color: '#4b5563', margin: '4px 0 0 0', textAlign: 'left' }}>{user?.phone}</p>
              </div>
              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top', textAlign: 'right' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }}>The Farmer Partner (Lessor)</p>
                <p style={{ fontWeight: '900', fontSize: '20px', margin: '0' }}>{booking.farmId?.farmerId?.name || "Verified Dhara Farmer"}</p>
                <p style={{ fontSize: '14px', color: '#4b5563', margin: '4px 0 0 0' }}>{booking.farmId?.location?.city}, {booking.farmId?.location?.state}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'block', width: '100%', fontSize: '16px', textAlign: 'left' }}>
            <div style={{ marginBottom: '30px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 'bold', borderLeft: '4px solid #f97316', paddingLeft: '16px', marginBottom: '10px', textAlign: 'left', display: 'block' }}>1. Property Description</h3>
              <p style={{ margin: '0', textAlign: 'left', display: 'block' }}>
                The Lessor hereby leases to the Lessee a specific portion of land identified as 
                <strong> Plot #{booking.plotId?.plotNumber || "N/A"}</strong> with an area of <strong>{booking.plotId?.size || booking.plotSize} Acres</strong> 
                within the premises of <strong>{booking.farmId?.name}</strong>.
              </p>
            </div>

            <div style={{ marginBottom: '30px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 'bold', borderLeft: '4px solid #f97316', paddingLeft: '16px', marginBottom: '10px', textAlign: 'left', display: 'block' }}>2. Scope of Cultivation</h3>
              <p style={{ margin: '0', textAlign: 'left', display: 'block' }}>
                The plot shall be utilized for the organic cultivation of <strong>{booking.selectedCrop?.name || "TBD"}</strong>. 
                The Lessor guarantees the use of sustainable farming practices as monitored by the Dhara Platform.
              </p>
            </div>

            <div style={{ marginBottom: '30px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 'bold', borderLeft: '4px solid #f97316', paddingLeft: '16px', marginBottom: '10px', textAlign: 'left', display: 'block' }}>3. Financial Consideration</h3>
              <p style={{ margin: '0', textAlign: 'left', display: 'block' }}>
                The Lessee has paid a total sum of <strong>₹{booking.totalPrice?.toLocaleString()}</strong> for the current 
                agricultural cycle. This amount covers all operational costs and management fees.
              </p>
            </div>
          </div>

          {/* Stamp and Signatures */}
          <div style={{ marginTop: '100px', position: 'relative', width: '100%', textAlign: 'left' }}>
            {/* Dhara Digital Stamp */}
            <div style={{ 
              position: 'absolute', 
              top: '-40px', 
              left: '50%', 
              marginLeft: '-60px', // Center the 120px stamp
              transform: 'rotate(-15deg)',
              width: '120px',
              height: '120px',
              border: '4px double #ef4444',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '12px',
              opacity: '0.6',
              zIndex: '10',
              backgroundColor: 'rgba(255,255,255,0.8)'
            }}>
              <div style={{ borderBottom: '2px solid #ef4444', marginBottom: '2px' }}>Dhara Verified</div>
              <div style={{ fontSize: '10px' }}>Digital Stamp</div>
              <div style={{ fontSize: '8px', marginTop: '2px' }}>{new Date().getFullYear()}</div>
            </div>

            <div style={{ width: '100%', borderTop: '2px solid #f3f4f6', paddingTop: '40px', overflow: 'hidden' }}>
              <div style={{ display: 'inline-block', width: '33%', textAlign: 'center', verticalAlign: 'top' }}>
                <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '15px', marginInline: 'auto', width: '80%' }}></div>
                <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af' }}>Investor Signature</p>
                <p style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '5px' }}>{user?.name}</p>
              </div>
              
              <div style={{ display: 'inline-block', width: '33%', textAlign: 'center', verticalAlign: 'top' }}>
                <div style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#1e40af', fontSize: '20px', marginBottom: '10px' }}>Dhara Admin</div>
                <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '15px', marginInline: 'auto', width: '80%' }}></div>
                <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af' }}>Authorized Dhara Signatory</p>
              </div>

              <div style={{ display: 'inline-block', width: '33%', textAlign: 'center', verticalAlign: 'top' }}>
                <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '15px', marginInline: 'auto', width: '80%' }}></div>
                <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af' }}>Farmer Partner</p>
                <p style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '5px' }}>{booking.farmId?.farmerId?.name}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '60px', textAlign: 'center', width: '100%' }}>
            <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold' }}>
              This is a legally binding digital document generated via Dhara Platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementPDF;
