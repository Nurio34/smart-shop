function More_Features() {
  const discountFeatures = [
    {
      icon: "🛒",
      title: "Cart-Based Offers",
      description: "Special discounts based on your cart composition",
    },
    {
      icon: "⭐",
      title: "Loyalty Rewards",
      description: "Earn points and get exclusive discounts",
    },
    {
      icon: "⚡",
      title: "Flash Deals",
      description: "Time-sensitive offers on trending items",
    },
    {
      icon: "🎁",
      title: "Bundle Savings",
      description: "Save more when you buy related items together",
    },
  ];

  return (
    <section className="py-[8vh] px-[4vw] grid gap-y-[4vh]">
      <h2 className="text-3xl md:text-4xl font-bold  text-center">
        Dynamic Discounts That Adapt to You
      </h2>
      <p className="text-xl  max-w-3xl mx-auto text-center">
        Our smart pricing system analyzes your shopping behavior in real-time to
        offer personalized discounts and deals.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-[3vw]">
        {discountFeatures.map((feature, index) => (
          <li
            key={index}
            className="bg-base-content text-base-300 py-[2vh] px-[2vw] rounded-xl shadow-md 
                grid gap-y-[1vh]
            "
          >
            <div className="text-3xl ">{feature.icon}</div>
            <h3 className="font-semibold ">{feature.title}</h3>
            <p className="">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default More_Features;
