function Features() {
  const features = [
    {
      icon: "🎯",
      title: "Personalized Recommendations",
      description:
        "Get product suggestions tailored to your preferences and shopping history.",
    },
    {
      icon: "🔒",
      title: "Secure Shopping",
      description:
        "Shop with confidence using our secure payment processing system.",
    },
    {
      icon: "🎁",
      title: "Dynamic Discounts",
      description:
        "Enjoy real-time personalized discounts based on your shopping behavior.",
    },
  ];

  return (
    <section className="py-[4vh] px-[4vw]">
      <h2 className="text-3xl md:text-4xl font-bold text-center pb-[4vh]">
        Smart Features for Smart Shopping
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-[4vw] gap-y-[1vh]">
        {features.map((feature, index) => (
          <li
            key={index}
            className="bg-white border border-gray-200 px-[2vw] pt-[2vh] pb-[4vh] rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="text-purple-600 mb-2">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Features;
