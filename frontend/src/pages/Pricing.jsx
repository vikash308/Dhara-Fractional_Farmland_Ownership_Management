import { HiOutlineCheckCircle } from "react-icons/hi";

function Pricing() {
  const plans = [
    { name: "Small Plot", size: "0.25 - 0.5 Acre", price: "Starting at ₹50,000", features: ["Professional Management", "Daily Progress Logs", "Personal Harvest Delivery", "Organic Certification"] },
    { name: "Standard Plot", size: "1 - 2 Acres", price: "Starting at ₹1,80,000", features: ["All Small Plot features", "Higher Yield Varieties", "Dedicated Farm Manager", "Priority Market Selling"] },
    { name: "Estate Owner", size: "5+ Acres", price: "Custom Quote", features: ["All Standard features", "Agri-Tourism Guest Access", "Bulk Selling Strategy", "Tax Optimization Guidance"] },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h1 className="text-5xl font-black text-[#1a4d2e] mb-6">Transparent Pricing</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">No hidden costs. Invest in land and crops with complete financial clarity.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {plans.map((plan, i) => (
          <div key={i} className="p-10 rounded-[40px] border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-500 group">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-orange-600 font-bold mb-6">{plan.size}</p>
            <div className="text-3xl font-black text-[#1a4d2e] mb-8">{plan.price}</div>
            <ul className="space-y-4 mb-10 text-left">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-gray-500 text-sm">
                  <HiOutlineCheckCircle className="text-xl text-green-500" /> {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-2xl bg-[#1a4d2e] text-white font-bold group-hover:bg-orange-500 transition-colors shadow-xl shadow-green-900/10">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
