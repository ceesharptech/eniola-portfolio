import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import FloatingNav from "../sections/FloatingNav";
import MobileMenu from "../sections/MobileMenu";
import ThemeToggle from "../components/ThemeToggle";
import { handleSignIn, handleSignOut } from "../firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const entries = [
  {
    id: "entry-1",
    name: "Amelia Cruz",
    message: "Loved the layout and the smooth animations. Super clean work!",
    date: "May 24, 2026",
    initials: "AC",
  },
  {
    id: "entry-2",
    name: "Jordan Blake",
    message:
      "The Tech Orbit is a standout. Inspires me to polish my portfolio.",
    date: "May 22, 2026",
    initials: "JB",
  },
  {
    id: "entry-3",
    name: "Kira Nomura",
    message: "Great balance of design and detail. The spacing feels premium.",
    date: "May 19, 2026",
    initials: "KN",
  },
  {
    id: "entry-4",
    name: "Omar Daniels",
    message: "Really impressed by the interactive elements. Smooth experience.",
    date: "May 18, 2026",
    initials: "OD",
  },
  {
    id: "entry-5",
    name: "Sofia Marin",
    message:
      "Beautiful typography and color choices. Everything feels cohesive.",
    date: "May 17, 2026",
    initials: "SM",
  },
  {
    id: "entry-6",
    name: "Theo Walters",
    message:
      "Clear storytelling and clean visuals. Subtle animations were great.",
    date: "May 15, 2026",
    initials: "TW",
  },
];

const Guestbook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser(user);
      // ...
    } else {
      // User is signed out
      setUser(null);
      // ...
    }
  });

  const handleNavClick = () => {};

  return (
    <div className="flex flex-col mb-20 items-center px-6 sm:px-8 lg:px-0 w-full min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100 transition-colors duration-300">
      <ThemeToggle />
      <FloatingNav activeId={null} onNavClick={handleNavClick} />
      <MobileMenu
        isOpen={isOpen}
        onToggle={() => setIsOpen((open) => !open)}
        onClose={() => setIsOpen(false)}
        onNavClick={handleNavClick}
        activeId={null}
      />

      <main className="mt-14 flex flex-col items-center w-full max-w-4xl">
        <section className="w-full flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            Guestbook
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            Drop a note after exploring the portfolio. Your thoughts and
            feedback mean a lot.
          </p>

          {!user && (
            <button
              type="button"
              className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-6 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-sm transition-all duration-200 hover:scale-[1.01]"
              onClick={handleSignIn}
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              Sign in with Google
            </button>
          )}

          {user && (
            <span className="mt-4 text-base font-medium flex items-center gap-2 text-gray-700 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="profile-image">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-6 w-6 rounded-full"
                  />
                </div>
                Signed in as {user.displayName}
              </div>
              <em className="text-gray-400 dark:text-gray-600">·</em>
              <button
                className="text-gray-400 font-normal dark:text-gray-500/90 dark:hover:text-gray-100 hover:text-gray-600 transition-colors duration-200"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </span>
          )}

          <span className="text-xs text-gray-500 dark:text-gray-400">
            Your message and signature will be publicly visible.
          </span>
        </section>

        <section className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-gray-100/40 dark:bg-neutral-900/60 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {entry.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {entry.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {entry.date}
                    </p>
                  </div>
                </div>
                <div className="h-10 w-14 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70"></div>
              </div>

              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {entry.message}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Guestbook;
