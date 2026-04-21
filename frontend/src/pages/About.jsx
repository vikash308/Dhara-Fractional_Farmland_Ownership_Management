import { HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineGlobeAlt, HiOutlineArrowCircleRight } from "react-icons/hi";

function About() {
  const values = [
    {
      title: "Democratizing Land",
      description: "We believe everyone should have the opportunity to participate in agriculture, regardless of their background or location.",
      icon: HiOutlineGlobeAlt,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Farmer First",
      description: "Our platform ensures farmers receive fair compensation and financial security through long-term partnerships.",
      icon: HiOutlineUserGroup,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Pure Transparency",
      description: "With daily updates and real-time logs, we bridge the trust gap between the plate and the field.",
      icon: HiOutlineLightBulb,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-green-50 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4 block">Our Journey</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a4d2e] leading-tight mb-6">
                Connecting the Soil <br />
                <span className="text-orange-500 font-light italic">To Your Soul.</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
                Dhara was born from a simple realization: while technology connects us to everything else, we've never been more disconnected from the food we eat and the land that grows it.
              </p>
              <div className="flex gap-4">
                <div className="flex -space-x-4 overflow-hidden">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-200"></div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-gray-900">1,200+ Users</p>
                  <p className="text-gray-500">Supporting local farmers</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-100 rounded-3xl z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Agriculture" 
                  className="rounded-3xl shadow-2xl relative z-10 w-full object-cover h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d2e] mb-6">The Dhara Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are building the world's most transparent agricultural ecosystem. A place where urban innovation meets rural tradition to create a sustainable future for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100">
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform`}>
                  <value.icon />
                </div>
                <h3 className="text-2xl font-bold text-[#1a4d2e] mb-4">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#1a4d2e] rounded-[50px] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 md:p-20 flex flex-col justify-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Why Digital <br /> Agriculture?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-orange-500 shrink-0 mt-1 flex items-center justify-center text-white text-xs">✓</div>
                    <p className="text-green-50 text-lg">Preserve biodiversity through organic practices.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-orange-500 shrink-0 mt-1 flex items-center justify-center text-white text-xs">✓</div>
                    <p className="text-green-50 text-lg">Reduce food waste by growing what is needed.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-orange-500 shrink-0 mt-1 flex items-center justify-center text-white text-xs">✓</div>
                    <p className="text-green-50 text-lg">Ensure 100% traceabilty of your daily nutrition.</p>
                  </div>
                </div>
              </div>
              <div className="h-[400px] lg:h-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Farmer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-6">Ready to join the movement?</h2>
          <p className="text-gray-500 mb-10">Start your journey today and become a part of the most authentic farming community.</p>
          <button className="btn-primary py-4 px-12 text-lg flex items-center gap-2 mx-auto shadow-xl shadow-green-900/20">
            Get Started Now <HiOutlineArrowCircleRight className="text-2xl" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;