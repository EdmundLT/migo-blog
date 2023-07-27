import React from "react";
import Banner from "../components/Banner";
import "styles/globals.css";
import Footer from "../components/Footer";
const about = () => {
  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="max-w-7xl mx-auto">
        <Banner />
        <div className="py-4 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-800 sm:text-xl">
            歡迎使用下列表格聯絡我們
          </p>
          <form
            className="space-y-8"
            method="POST"
            data-netlify="true"
            name="contact"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </p>
              <input
                name="email"
                type="email"
                id="email"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="abc@123.com"
                required
              ></input>
            </div>
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900 ">
                Subject
              </p>
              <input
                name="subject"
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              ></input>
            </div>
            <div className="sm:col-span-2">
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Your message
              </p>
              <textarea
                name="message"
                id="message"
                rows={6}
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
