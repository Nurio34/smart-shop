import Image from "next/image";

function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in [year], we have been committed to delivering excellence
              in [industry/service]. Our journey began with a simple mission:
              [brief mission statement].
            </p>
            <p className="">
              Today, we continue to grow and innovate, serving our clients with
              the same dedication and passion that inspired our founding.
            </p>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/app/about.webp"
              alt="DALL·E 2025-01-13 16.06.24 - A professional and inviting About Us page image for a company. The composition includes a group of diverse, smiling professionals collaborating"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in everything we do.",
              },
              {
                title: "Integrity",
                description:
                  "We conduct our business with the highest ethical standards.",
              },
              {
                title: "Innovation",
                description:
                  "We embrace change and continuously seek to improve.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 bg-base-content text-base-300 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className=" mb-6">
            Our team of dedicated professionals brings together years of
            experience and expertise to deliver the best results for our
            clients.
          </p>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
