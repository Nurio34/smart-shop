function ServicesPage() {
  return (
    <main
      className="container mx-auto px-4 py-8
      grid place-content-center
    "
    >
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service Card 1 */}
        <div className="bg-base-content text-base-300 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fast Delivery</h2>
          <p className="">
            Express delivery service with real-time tracking. Get your items
            delivered within 24-48 hours nationwide.
          </p>
        </div>

        {/* Service Card 2 */}
        <div className="bg-base-content text-base-300 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Secure Payment</h2>
          <p className="">
            Multiple secure payment options including credit cards, digital
            wallets, and cash on delivery.
          </p>
        </div>

        {/* Service Card 3 */}
        <div className="bg-base-content text-base-300 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">24/7 Customer Support</h2>
          <p className="">
            Our dedicated support team is available round the clock to assist
            you with any queries or concerns.
          </p>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p className=" mb-6">
          Our customer service team is here to assist you with any questions.
        </p>
        <button className=" btn bg-secondary text-secondary-content ">
          Contact Support
        </button>
      </div>
    </main>
  );
}

export default ServicesPage;
