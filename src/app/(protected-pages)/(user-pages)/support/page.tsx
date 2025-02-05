"use client";

import { ChangeEvent, FormEvent, useState } from "react";

function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      // Example API call to submit support message
      // await fetch('/api/support', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' },
      // });

      setStatus("Message submitted successfully!");
    } catch (error) {
      console.log(error);

      setStatus("Failed to submit the message. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Customer Support</h1>
      <p className="text-lg">
        We arere here to help! If you have any questions or need assistance with
        your order, feel free to contact us using the form below.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>

      {/* Status message */}
      {status && <p className="mt-4 text-lg text-center">{status}</p>}

      {/* FAQs Section */}
      <section>
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4 mt-6">
          <div>
            <h3 className="text-xl font-semibold">How do I track my order?</h3>
            <p>
              You can track your order by visiting the -My Orders- section in
              your account and selecting the order you wouldd like to track.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">How can I return an item?</h3>
            <p>
              If you are not satisfied with your purchase, you can return the
              item within 30 days. Please visit our Returns page for more
              details.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              Can I change my order after placing it?
            </h3>
            <p>
              Unfortunately, we are unable to change orders once they are
              placed. However, you can cancel your order within 1 hour of
              purchase.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SupportPage;
