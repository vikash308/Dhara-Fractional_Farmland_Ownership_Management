

function About() {
  return<>
    <div className="bg-white text-gray-800">

      <section className="bg-green-300 py-8 px-6 text-center text-gray-800">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold ">
          Experience Farming—Right From Your Screen        
        </h1>
      </section>


      <section className="py-12 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-base sm:text-2xl font-semibold mb-4">What is Dhara?</h2>
        <p className="text-sm sm:text-base">
          Dhara is a digital platform that allows users to rent farmland,
          grow crops, and track farming activities online. It connects
          urban users with real farmers, making agriculture more accessible
          and transparent.
        </p>
      </section>


      <section className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-base sm:text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-sm sm:text-base">
          To make farming accessible to everyone, support farmers with better
          income, and bring transparency to agriculture.
        </p>
      </section>


      <section className="bg-green-50 py-12 px-6 text-center">
        <h2 className="text-base sm:text-2xl font-semibold mb-6">How Dhara Works</h2>

        <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
         Dhara is a digital platform that lets users experience farming without owning land. They can explore farms, choose a plot, and select crops with ease.
          <br />
          After booking, farmers handle cultivation while users track growth and updates in real time through a dashboard, ensuring a simple and transparent experience.
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <h2 className="text-base sm:text-2xl font-semibold mb-8">Why Choose Dhara?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg text-sm sm:text-base">Start farming without owning land</div>
          <div className="p-4 border rounded-lg text-sm sm:text-base">Track your crops in real time</div>
          <div className="p-4 border rounded-lg text-sm sm:text-base">No farming experience needed</div>
          <div className="p-4 border rounded-lg text-sm sm:text-base">Simple and beginner-friendly platform</div>
          <div className="p-4 border rounded-lg text-sm sm:text-base">Connects users & farmers</div>
          <div className="p-4 border rounded-lg text-sm sm:text-base">Promote sustainable agriculture</div>
        </div>
      </section>

    </div>
 </>
};

export default About;