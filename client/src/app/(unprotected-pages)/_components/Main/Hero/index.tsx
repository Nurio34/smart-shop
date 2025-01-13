function Hero() {
  return (
    <section
      className="bg-gradient-to-r from-primary to-secondary text-primary-content py-[2vh] md:py-[8vh] px-[4vw]
        grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-y-[2vh] gap-x-[2vw]
    "
    >
      <div className="">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-[18ch]">
          Shop Smarter with AI-Powered Recommendations
        </h1>
        <p className="text-xl mb-8">
          Experience personalized shopping with our emotional AI assistant that
          understands your preferences and mood.
        </p>
        <button className="bg-primary-content text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          Start Shopping
        </button>
      </div>
      <div
        className="relative h-full w-full rounded-lg"
        style={{
          backgroundImage: "url('/app/hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </section>
  );
}
export default Hero;
