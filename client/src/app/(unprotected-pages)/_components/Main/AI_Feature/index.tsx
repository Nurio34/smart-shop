function AI_Feature() {
  const aiFeatures = [
    {
      icon: "🎯",
      text: "Mood-based product recommendations",
    },
    {
      icon: "👔",
      text: "Personal style analysis",
    },
    {
      icon: "📊",
      text: "Smart price tracking",
    },
    {
      icon: "📱",
      text: "Shopping habit insights",
    },
  ];

  return (
    <section
      className=" py-[2vh] md:py-[8vh] px-[4vw]
        grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-y-[2vh] gap-x-[2vw]
    "
    >
      <div
        className="relative h-full w-full rounded-lg"
        style={{
          backgroundImage: "url('/app/asistant.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="">
        <h1 className="text-3xl text-center md:text-start md:text-4xl font-bold mb-6 md:max-w-[18ch] ">
          Meet Your Emotional Shopping Assistant
        </h1>
        <p className="text-xl mb-8">
          Our AI assistant analyzes your mood and preferences to provide
          personalized product recommendations that match your current emotional
          state.
        </p>
        <ul className="space-y-4">
          {aiFeatures.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-2xl mr-3">{feature.icon}</span>
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default AI_Feature;
