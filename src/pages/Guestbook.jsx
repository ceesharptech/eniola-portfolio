import { useEffect, useMemo, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import FloatingNav from "../sections/FloatingNav";
import MobileMenu from "../sections/MobileMenu";
import ThemeToggle from "../components/ThemeToggle";
import { handleSignIn, handleSignOut } from "../firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  createGuestbookEntry,
  subscribeToGuestbookEntries,
} from "../firebase/guestbook";

const Guestbook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [entries, setEntries] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [entriesLoading, setEntriesLoading] = useState(true);
  const [entriesError, setEntriesError] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signatureError, setSignatureError] = useState("");
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef(null);
  const messageRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const lastSubmitRef = useRef({ message: "", time: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const unsubscribe = subscribeToGuestbookEntries(
      (data) => {
        setEntries(data);
        setEntriesLoading(false);
        setEntriesError("");
      },
      () => {
        setEntriesError("Could not load guestbook entries. Please try again.");
        setEntriesLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const formatEntryDate = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate
      ? timestamp.toDate()
      : timestamp.seconds
        ? new Date(timestamp.seconds * 1000)
        : timestamp instanceof Date
          ? timestamp
          : null;
    if (!date) return "Just now";
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const messageCount = useMemo(() => message.trim().length, [message]);
  const statusMessage = submitError || submitSuccess;
  const statusClass = submitError
    ? "text-red-500"
    : submitSuccess
      ? "text-emerald-600"
      : "text-gray-500 dark:text-gray-400";

  const setupCanvas = (canvas) => {
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const { width, height } = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
    context.scale(scale, scale);
    context.lineWidth = 2.4;
    context.lineCap = "round";
    context.lineJoin = "round";
    const isDark = document.documentElement.classList.contains("dark");
    context.strokeStyle = isDark ? "#e5e7eb" : "#1f2937";
    if (signatureDataUrl) {
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
      };
      image.src = signatureDataUrl;
    } else {
      context.clearRect(0, 0, width, height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setupCanvas(canvas);
    const handleResize = () => setupCanvas(canvas);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [signatureDataUrl, isModalOpen]);

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");
    if (context) {
      const isDark = document.documentElement.classList.contains("dark");
      context.strokeStyle = isDark ? "#e5e7eb" : "#1f2937";
    }
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    lastPointRef.current = point;
    isDrawingRef.current = true;
  };

  const draw = (event) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const rect = canvas.getBoundingClientRect();
    const nextPoint = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    context.beginPath();
    context.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    context.lineTo(nextPoint.x, nextPoint.y);
    context.stroke();
    lastPointRef.current = nextPoint;
    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const endDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setSignatureDataUrl(canvas.toDataURL("image/png"));
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const { width, height } = canvas.getBoundingClientRect();
    context.clearRect(0, 0, width, height);
    setHasSignature(false);
    setSignatureDataUrl("");
  };

  const openModal = () => {
    setSubmitError("");
    setSubmitSuccess("");
    setSignatureError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitError("");
    setSubmitSuccess("");
    setSignatureError("");
    setMessage("");
    clearSignature();
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (messageRef.current) {
      messageRef.current.focus();
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setSignatureError("");

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setSubmitError("Please enter a message.");
      return;
    }

    if (trimmedMessage.length > 300) {
      setSubmitError("Message is too long. Please limit to 300 characters.");
      return;
    }

    if (!hasSignature || !signatureDataUrl) {
      setSignatureError("Please add your signature before submitting.");
      return;
    }

    const now = Date.now();
    if (
      lastSubmitRef.current.message === trimmedMessage &&
      now - lastSubmitRef.current.time < 3000
    ) {
      setSubmitError("Please wait a moment before submitting again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createGuestbookEntry({
        name: user?.displayName || "Anonymous",
        message: trimmedMessage,
        uid: user?.uid,
        photoURL: user?.photoURL,
        signature: signatureDataUrl,
      });
      setMessage("");
      clearSignature();
      setSubmitSuccess("Entry added. Thank you for signing!");
      lastSubmitRef.current = { message: trimmedMessage, time: now };
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting guestbook entry:", error);
      setSubmitError("Could not submit your entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInClick = async () => {
    setAuthError("");
    try {
      await handleSignIn();
    } catch (error) {
      console.error("Error signing in:", error);
      setAuthError("Sign in failed. Please try again.");
    }
  };

  const handleSignOutClick = async () => {
    setAuthError("");
    try {
      await handleSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
      setAuthError("Sign out failed. Please try again.");
    }
  };

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

          {authLoading && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-neutral-800 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
              Checking your sign-in status...
            </div>
          )}

          {!authLoading && !user && (
            <button
              type="button"
              className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-6 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-sm transition-all duration-200 hover:scale-[1.01]"
              onClick={handleSignInClick}
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              Sign in with Google
            </button>
          )}

          {!authLoading && user && (
            <div className="mt-6 w-full rounded-3xl border border-gray-200 dark:border-neutral-800 bg-gray-100/40 dark:bg-neutral-900/60 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "Guest"}
                      className="h-12 w-12 rounded-full border border-gray-200 dark:border-neutral-700 object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {(user.displayName || "G").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Signed in as {user.displayName || "Guest"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Ready to leave a note in the guestbook.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={openModal}
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors duration-200 hover:bg-gray-800"
                  >
                    Sign Guestbook
                  </button>
                  <button
                    type="button"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                    onClick={handleSignOutClick}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}

          {authError && (
            <p className="mt-4 text-xs text-red-500">{authError}</p>
          )}

          {!authLoading && !user && (
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Sign in to leave a message and signature.
            </p>
          )}
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
            <button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              aria-label="Close guestbook form"
              onClick={closeModal}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="guestbook-modal-title"
              className="relative z-10 w-full max-w-2xl rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    id="guestbook-modal-title"
                    className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Sign the guestbook
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Share a short note and leave your signature.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-800 dark:text-gray-100"
                  >
                    Your message
                  </label>
                  <textarea
                    ref={messageRef}
                    className="bg-white dark:bg-neutral-900 min-h-[160px] w-full border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-sm p-4 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-neutral-700"
                    required
                    name="message"
                    id="message"
                    placeholder="Leave a note about the portfolio"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={300}
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className={statusClass}>{statusMessage || " "}</span>
                    <span>{messageCount}/300</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      Signature
                    </p>
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    >
                      Clear signature
                    </button>
                  </div>

                  <div className="rounded-2xl border border-dashed border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4">
                    <canvas
                      ref={canvasRef}
                      className="h-36 w-full touch-none"
                      aria-label="Signature canvas"
                      onPointerDown={(event) => {
                        event.currentTarget.setPointerCapture(event.pointerId);
                        startDrawing(event);
                      }}
                      onPointerMove={draw}
                      onPointerUp={endDrawing}
                      onPointerLeave={endDrawing}
                      onPointerCancel={endDrawing}
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Draw your signature using your mouse or finger.
                    </p>
                    {signatureError && (
                      <p className="mt-2 text-xs text-red-500">
                        {signatureError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      {isSubmitting ? "Submitting..." : "Submit entry"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Your message and signature will be publicly visible.
                  </span>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {entriesLoading && (
            <>
              {[...Array(4)].map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-gray-100/40 dark:bg-neutral-900/60 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-neutral-700 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32 rounded-full bg-gray-200 dark:bg-neutral-700 animate-pulse" />
                      <div className="h-3 w-24 rounded-full bg-gray-200 dark:bg-neutral-700 animate-pulse" />
                    </div>
                  </div>
                  <div className="mt-4 h-16 rounded-2xl bg-gray-200 dark:bg-neutral-700 animate-pulse" />
                </div>
              ))}
            </>
          )}

          {!entriesLoading && entriesError && (
            <div className="col-span-full rounded-3xl border border-red-200 bg-red-50/80 p-6 text-sm text-red-600">
              {entriesError}
            </div>
          )}

          {!entriesLoading && !entriesError && entries.length === 0 && (
            <div className="col-span-full rounded-3xl border border-gray-200 dark:border-neutral-800 bg-gray-100/40 dark:bg-neutral-900/60 p-8 text-center text-sm text-gray-600 dark:text-gray-300">
              No guestbook entries yet. Be the first to leave a note.
            </div>
          )}

          {!entriesLoading &&
            !entriesError &&
            entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-gray-100/40 dark:bg-neutral-900/60 p-6 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {(entry.name || "G").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {entry.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatEntryDate(entry.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="h-10 w-14 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70"></div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                  {entry.message || ""}
                </p>

                {entry.signature && (
                  <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 p-3">
                    <img
                      src={entry.signature}
                      alt={`Signature from ${entry.name || "Guest"}`}
                      className="w-full h-16 object-contain"
                    />
                  </div>
                )}
              </article>
            ))}
        </section>
      </main>
    </div>
  );
};

export default Guestbook;
