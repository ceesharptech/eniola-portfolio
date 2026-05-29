import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon } from "@hugeicons/core-free-icons";
import PulseIcon from "../components/PulseIcon";
import MainButton from "../components/MainButton";
import myAvatar from "../avatars/my-avatar.webp";

const IntroSection = () => {
  return (
    <div id="home" className="flex flex-col items-start gap-5">
      <div className="profile-picture w-20 h-20 lg:w-28 lg:h-28 rounded-full animate-float delay-1">
        <img
          src={myAvatar}
          alt="My Avatar"
          className="w-full h-full rounded-full"
        />
      </div>

      <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl flex flex-col gap-1 justify-start tracking-tighter text-neutral-900 dark:text-gray-100">
        <span className="flex flex-wrap gap-2">
          <span className="word-reveal delay-3">Hey,</span>
          <span className="word-reveal delay-4">I'm</span>
          <span className="word-reveal delay-5">Eniola</span>
          <span className="word-reveal delay-6">Amusu.</span>
        </span>
        <span className="flex flex-wrap gap-2">
          <span className="word-reveal delay-4">Developer</span>
          <span className="word-reveal delay-5">&</span>
          <span className="word-reveal delay-6">Designer</span>
        </span>
      </h2>

      <p className="font-medium text-sm lg:text-base leading-normal tracking-tight text-gray-600 dark:text-gray-300 max-w-96 lg:max-w-[520px] animate-rise delay-4">
        Crafting seamless experiences and bold visuals. Senior year student by
        day, creative thinker and aspiring innovator by{" "}
        <HugeiconsIcon icon={Moon02Icon} className="w-4 h-4 inline" /> night
      </p>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 animate-rise delay-5">
        <MainButton>Book a Call</MainButton>
        <button
          type="button"
          className="bg-[#55ff6f]/30 dark:bg-[#1c3d2b]/70 flex items-center justify-center gap-2 font-semibold text-[#0ea700] dark:text-[#7dff9a] text-sm lg:text-[15px] px-6 py-3 sm:px-6 sm:py-4 lg:px-7 lg:py-4 rounded-full transition-colors duration-150 tracking-tight"
        >
          <PulseIcon />
          Available for new project
        </button>
      </div>
    </div>
  );
};

export default IntroSection;
