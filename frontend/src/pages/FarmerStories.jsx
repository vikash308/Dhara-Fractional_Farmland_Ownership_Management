function FarmerStories() {
  const stories = [
    { name: "Ramesh Kumar", location: "Punjab", story: "Since joining Dhara, I've seen a 40% increase in my income through organic practices and guaranteed investor support.", image: "/farmer-story-1.png" },
    { name: "Savitri Devi", location: "Maharashtra", story: "The digital platform helps me document my work daily. It's built a trust with urban families that I never thought possible.", image: "/farmer-story-2.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl font-black text-[#1a4d2e] mb-6">Farmer Success Stories</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Meet the heroes behind your harvest. Empowering rural communities through technology.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {stories.map((s, i) => (
          <div key={i} className="bg-white rounded-[50px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row border border-gray-100">
            <div className="md:w-1/2">
              <img src={s.image} alt={s.name} className="w-full h-full object-cover min-h-[300px]" />
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <div className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4">{s.location}</div>
              <h3 className="text-2xl font-bold text-[#1a4d2e] mb-6">"{s.story}"</h3>
              <p className="text-gray-900 font-bold">- {s.name}</p>
              <p className="text-gray-400 text-sm">Certified Dhara Farmer</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmerStories;
