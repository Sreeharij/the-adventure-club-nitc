import React from 'react';
import MotionWrapper from '../components/MotionWrapper';

const Contact = () => {
  return (
    <MotionWrapper>
      <main className="container mx-auto my-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-600">Contact Us</h2>
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                type="text"
                id="name"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                type="email"
                id="email"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">Message</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                id="message"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </main>
    </MotionWrapper>
  );
};

export default Contact;
