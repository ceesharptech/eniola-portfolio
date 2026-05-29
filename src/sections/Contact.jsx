import useScrollReveal from "../hooks/useScrollReveal";

const Contact = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -12% 0px",
  });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <div id="mail" className="mt-20 flex flex-col items-start w-full max-w-2xl">
      <div className="flex flex-col items-start gap-4 mb-10">
        <h2
          ref={headingRef}
          className={`font-bold text-2xl md:text-3xl tracking-tighter text-gray-900 dark:text-gray-100 scroll-reveal ${
            headingVisible ? "is-visible" : ""
          }`}
        >
          Get in touch
        </h2>
        <span
          ref={contentRef}
          className={`text-base lg:text-base text-gray-600 dark:text-gray-300 font-normal tracking-tight scroll-reveal ${
            contentVisible ? "is-visible" : ""
          }`}
        >
          Feel free to book a call or email me if you'd like to discuss a
          potential project
        </span>
      </div>

      <form
        className={`flex flex-col items-start gap-3 w-full mb-10 scroll-reveal ${
          contentVisible ? "is-visible" : ""
        }`}
        action=""
      >
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-start gap-3 md:gap-2 w-full">
          <label className="w-full md:w-1/2">
            <span className="sr-only">Full name</span>
            <input
              type="text"
              name="full-name"
              id="full-name"
              placeholder="Full Name"
              autoComplete="name"
              className="bg-gray-100 dark:bg-neutral-900 w-full border border-gray-300 dark:border-neutral-700 rounded-xl px-5 py-3 shadow-sm outline-gray-400 dark:outline-neutral-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500"
              required
            />
          </label>
          <label className="w-full md:w-1/2">
            <span className="sr-only">Email</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="email"
              className="bg-gray-100 dark:bg-neutral-900 w-full border border-gray-300 dark:border-neutral-700 rounded-xl px-5 py-3 shadow-sm outline-gray-400 dark:outline-neutral-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500"
              required
            />
          </label>
        </div>
        <label className="w-full">
          <span className="sr-only">Message</span>
          <textarea
            className="bg-gray-100 dark:bg-neutral-900 h-48 w-full border border-gray-300 dark:border-neutral-700 rounded-xl shadow-sm p-6 outline-gray-400 dark:outline-neutral-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500"
            required
            name="message"
            id="message"
            placeholder="Write your message"
          />
        </label>
        <button
          className="bg-gray-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-[16px] lg:text-[15px] px-5 py-4 sm:px-7 sm:py-4
        lg:px-8 lg:py-4 rounded-[12px] hover:bg-black dark:hover:bg-white active:scale-[0.98] transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed w-full"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
