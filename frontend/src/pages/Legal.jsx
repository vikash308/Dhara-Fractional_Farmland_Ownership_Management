function Legal() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6 bg-white p-12 rounded-[40px] shadow-sm">
        <h1 className="text-4xl font-black text-[#1a4d2e] mb-10">Legal Information</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Service</h2>
            <p className="text-gray-500 leading-relaxed">
              Welcome to Dhara. By using our platform, you agree to comply with and be bound by the following terms and conditions of use. Our platform provides fractional ownership management for farmlands in India. All investments are subject to agricultural risks and market fluctuations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
            <p className="text-gray-500 leading-relaxed">
              Your privacy is important to us. We collect personal information only when necessary to provide our services to you. We protect your data using industry-standard encryption and do not share it with third parties except as required by law for property registration and verification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-500 leading-relaxed italic">
              Dhara is a management platform and does not guarantee fixed returns. Farmland ownership involves real-estate and agricultural variables. Please consult with financial advisors before making significant investments.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Legal;
