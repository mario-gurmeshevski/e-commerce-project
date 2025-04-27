import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const FacebookIcon = () => (
  <svg
    className="h-7 w-7"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
  >
    <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="h-7 w-7"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
  >
    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      toast.success("Email sent!", { position: "top-center" });
    } else {
      toast.error("Failed to send email.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="pt-10 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Social Media Logos */}
      <div className="flex justify-center mb-8 space-x-8">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-3xl sm:text-4xl underline underline-offset-[12px] sm:underline-offset-[16px]">
          Контактирај нѐ
        </p>
      </div>

      {/* Main Grid: Form Left, Info Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
        {/* Contact Form (Left) */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-lg font-semibold"
                >
                  Име
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-lg font-semibold"
                >
                  Презиме
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-semibold"
              >
                Е-пошта
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-lg font-semibold"
              >
                Телефон
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={form.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-semibold"
              >
                Порака
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Испрати
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info (Right, Row) */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            {/* Farm Address */}
            <div className="space-y-3 text-center md:text-left px-4 py-6 flex-1 min-w-[250px]">
              <hr className="w-12 border-t-2 border-black mx-auto md:mx-0" />
              <p className="text-3xl md:text-4xl font-bold">Фарма</p>
              <p className="text-xl">R1107, Старо Лагово,</p>
              <p className="text-xl">Прилеп,</p>
              <p className="text-xl">Северна Македонија, 7500</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 text-center md:text-left px-4 py-6 flex-1 min-w-[250px]">
              <hr className="w-12 border-t-2 border-black mx-auto md:mx-0" />
              <p className="text-3xl md:text-4xl font-bold">Адреса</p>
              <a
                href="mailto:info@makmela.com"
                className="text-xl block hover:underline"
              >
                info@makmela.com
              </a>
              <a
                href="tel:+38970400344"
                className="text-xl block hover:underline"
              >
                T: +389 70 400 344
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1927.7893134048873!2d21.437205467558712!3d41.98637520547707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354156e09f8f943%3A0x4f70677f66ebc77c!2sQinshift%20Academy!5e0!3m2!1sen!2smk!4v1740407987859!5m2!1sen!2smk"
          width="100%"
          height="350"
          className="h-[350px] sm:h-[400px] lg:h-[450px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Makmela Location Map"
        ></iframe>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Contact;
