import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { HiOutlineDocumentText, HiOutlineDownload } from "react-icons/hi";

const SampleAgreement = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample Data for the Agreement
  const sampleData = {
    booking: {
      _id: "SAMPLE67890",
      createdAt: new Date().toISOString(),
      plotId: {
        plotNumber: "VIP-001",
        size: 0.5
      },
      farmId: {
        name: "Green Valley Organic Estate",
        location: { city: "Pune", state: "Maharashtra" },
        farmerId: { name: "Ramesh Kumar" }
      },
      totalPrice: 25000,
      selectedCrop: { name: "Premium Basmati Rice" }
    },
    user: {
      name: "John Doe (Sample Investor)",
      email: "johndoe@example.com",
      phone: "+91 98765 43210"
    }
  };

  const downloadPDF = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const elementId = "sample-agreement-template";
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error("Sample PDF Element not found");
      setIsGenerating(false);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Dhara_Sample_Agreement.pdf");
    } catch (error) {
      console.error("Sample PDF Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="inline-block">
      <button 
        onClick={downloadPDF}
        disabled={isGenerating}
        className="flex items-center gap-2 px-6 py-3 bg-white text-[#1a4d2e] border-2 border-[#1a4d2e] rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
      >
        <HiOutlineDocumentText className="text-xl" />
        {isGenerating ? "Generating Sample..." : "See Sample Agreement"}
      </button>

      {/* Hidden Template */}
      <div style={{ position: 'absolute', left: '-10000px', top: '0', pointerEvents: 'none', zIndex: '-9999' }}>
        <div 
          id="sample-agreement-template"
          style={{ 
            width: '210mm', 
            padding: '80px', 
            backgroundColor: '#ffffff', 
            color: '#1a4d2e', 
            fontFamily: 'serif',
            lineHeight: '1.5',
            minHeight: '297mm',
            boxSizing: 'border-box',
            textAlign: 'left'
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '4px solid #f97316', paddingBottom: '30px', marginBottom: '40px', width: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'inline-block', width: '60%', verticalAlign: 'top' }}>
              <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0', color: '#1a4d2e', letterSpacing: '-2px' }}>DHARA</h1>
              <p style={{ color: '#f97316', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', margin: '5px 0 0 0' }}>SAMPLE AGREEMENT</p>
            </div>
            <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top', textAlign: 'right', fontSize: '14px', paddingTop: '10px' }}>
              <p style={{ fontWeight: 'bold', margin: '0' }}>Agreement ID: {sampleData.booking._id}</p>
              <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px', textDecoration: 'underline', textDecorationColor: '#fdba74', textTransform: 'uppercase' }}>Sample Farm Lease Agreement</h2>

          <div style={{ fontSize: '18px', marginBottom: '40px' }}>
            <p>This is a <strong>SAMPLE DOCUMENT</strong> for demonstration purposes. It outlines the legal structure between Investor and Farmer.</p>
            
            <div style={{ marginTop: '30px', backgroundColor: '#f9fafb', padding: '30px', borderRadius: '24px', border: '1px solid #f3f4f6', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }}>The Investor</p>
                <p style={{ fontWeight: '900', fontSize: '20px', margin: '0' }}>{sampleData.user.name}</p>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>{sampleData.user.email}</p>
              </div>
              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top', textAlign: 'right' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }}>The Farmer Partner</p>
                <p style={{ fontWeight: '900', fontSize: '20px', margin: '0' }}>{sampleData.booking.farmId.farmerId.name}</p>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>{sampleData.booking.farmId.location.city}, {sampleData.booking.farmId.location.state}</p>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '16px' }}>
             <h3 style={{ fontSize: '19px', fontWeight: 'bold', borderLeft: '4px solid #f97316', paddingLeft: '16px', marginBottom: '10px' }}>1. Lease Terms</h3>
             <p>The Investor leases <strong>{sampleData.booking.plotId.size} Acres</strong> in <strong>{sampleData.booking.farmId.name}</strong> for a total price of <strong>₹{sampleData.booking.totalPrice.toLocaleString()}</strong>.</p>
             
             <h3 style={{ fontSize: '19px', fontWeight: 'bold', borderLeft: '4px solid #f97316', paddingLeft: '16px', marginBottom: '10px', marginTop: '20px' }}>2. Profit Sharing</h3>
             <p>All harvest produce belongs to the Investor. Farmer acts as a service provider and manager of the land. Profits are settled upon successful harvest and sale.</p>
          </div>

          {/* Signatures */}
          <div style={{ marginTop: '100px', width: '100%', borderTop: '2px solid #f3f4f6', paddingTop: '40px' }}>
              <div style={{ display: 'inline-block', width: '33%', textAlign: 'center' }}>
                <div style={{ fontFamily: 'cursive', color: '#1a4d2e', fontSize: '18px', marginBottom: '5px' }}>John Doe</div>
                <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '10px', width: '80%', margin: '0 auto' }}></div>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af' }}>INVESTOR SIGNATURE</p>
              </div>
              
              <div style={{ display: 'inline-block', width: '33%', textAlign: 'center' }}>
                <div style={{ border: '2px solid #ef4444', borderRadius: '50%', width: '60px', height: '60px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: '8px', transform: 'rotate(-15deg)', fontWeight: 'bold' }}>VERIFIED</div>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', marginTop: '10px' }}>DHARA STAMP</p>
              </div>

              <div style={{ display: 'inline-block', width: '33%', textAlign: 'center' }}>
                <div style={{ fontFamily: 'cursive', color: '#1a4d2e', fontSize: '18px', marginBottom: '5px' }}>Ramesh Kumar</div>
                <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '10px', width: '80%', margin: '0 auto' }}></div>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af' }}>FARMER SIGNATURE</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleAgreement;
