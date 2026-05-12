import { useState } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineChevronDown, HiOutlinePaperAirplane } from "react-icons/hi";
import { toast } from "react-toastify";

function Contact() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "Is digital farming safe?", a: "Absolutely. All plots are physically verified and legally documented. You can visit your plot anytime." },
    { q: "How do I get my harvest?", a: "You can choose to have it delivered to your home, or we can sell it in the market and transfer the profit to you." },
    { q: "What if the crop fails?", a: "We use crop insurance and professional management to minimize risks. However, farming involves natural variables." },
    { q: "Can I choose any crop?", a: "You can choose from a curated list of seasonal crops that are best suited for your plot's soil." },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! Our team will reach out soon.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Side: Contact Info & FAQ */}
          <div className="space-y-12 animate-in slide-in-from-left duration-1000">
            <div>
              <h1 className="text-5xl font-black text-[#1a4d2e] mb-6">Let's Talk <br /> Agriculture.</h1>
              <p className="text-gray-500 text-lg leading-relaxed">Have questions about digital farming or land investment? Our expert team is here to guide you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-50 text-[#1a4d2e] rounded-xl flex items-center justify-center text-2xl mb-4">
                  <HiOutlineMail />
                </div>
                <h3 className="font-bold text-gray-900">Email Us</h3>
                <p className="text-sm text-gray-400 mt-1">support@dhara.com</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                  <HiOutlinePhone />
                </div>
                <h3 className="font-bold text-gray-900">Call Us</h3>
                <p className="text-sm text-gray-400 mt-1">+91 98765 43210</p>
              </div>
            </div>

            <div className="space-y-4 pt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full p-6 flex justify-between items-center text-left hover:bg-gray-50"
                  >
                    <span className="font-bold text-gray-800">{faq.q}</span>
                    <HiOutlineChevronDown className={`text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-6 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-50 animate-in slide-in-from-top duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="sticky top-24 animate-in slide-in-from-right duration-1000">
            <div className="bg-[#1a4d2e] rounded-[50px] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
              
              <h2 className="text-3xl font-bold mb-8 relative z-10">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-green-200 mb-2">First Name</label>
                    <input type="text" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-green-200 mb-2">Last Name</label>
                    <input type="text" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-green-200 mb-2">Email Address</label>
                  <input type="email" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-green-200 mb-2">Subject</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option className="text-gray-900">General Inquiry</option>
                    <option className="text-gray-900">Land Investment</option>
                    <option className="text-gray-900">Farmer Partnership</option>
                    <option className="text-gray-900">Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-green-200 mb-2">Message</label>
                  <textarea rows="4" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-orange-900/40 flex items-center justify-center gap-3">
                  <HiOutlinePaperAirplane className="rotate-90 text-xl" /> Send Message
                </button>
              </form>

              <div className="mt-12 flex items-center gap-4 pt-8 border-t border-white/10 text-green-100/60 text-sm">
                <HiOutlineLocationMarker className="text-xl text-orange-400" />
                <p>12th Floor, Agri-Tech Tower, MG Road, Bangalore, India</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
