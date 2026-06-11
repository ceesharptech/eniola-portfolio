import { useEffect, useState } from "react";
import { getNowPlaying } from "../lib/spotify";
import { FaSpotify } from "react-icons/fa";

const SpotifyCurrentlyListening = () => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
          setIsPlaying(false);
          setLoading(false);
          return;
        }

        const song = await response.json();

        if (song.item === null) {
          setIsPlaying(false);
          setLoading(false);
          return;
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists
          .map((_artist) => _artist.name)
          .join(", ");
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        setTrack({
          title,
          artist,
          albumImageUrl,
          songUrl,
        });
        setIsPlaying(isPlaying);
      } catch (e) {
        setIsPlaying(false);
        console.error("Error fetching Spotify data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();

    // Optionally poll every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mt-12 flex justify-center opacity-50">
        <div className="flex items-center gap-3">
          <FaSpotify className="text-[#1DB954] w-6 h-6 animate-pulse" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Checking Spotify...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mt-20 flex justify-center px-2 sm:px-8 lg:px-0">
      <div className="flex bg-white/70 dark:bg-neutral-900/70 border border-gray-200 dark:border-neutral-800 rounded-3xl p-4 sm:p-5 shadow-sm backdrop-blur-md items-center gap-4 transition-all duration-300 w-full sm:w-auto hover:shadow-md hover:scale-[1.01]">
        <div className="relative flex-shrink-0">
          {isPlaying && track ? (
            <img
              src={track.albumImageUrl}
              alt={track.title}
              className="w-14 h-14 rounded-xl shadow-sm object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center shadow-inner">
              <FaSpotify className="text-gray-400 dark:text-neutral-500 w-7 h-7" />
            </div>
          )}
          {isPlaying && (
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-1 shadow-sm border border-gray-200 dark:border-neutral-800">
              <FaSpotify className="text-[#1DB954] w-3 h-3" />
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0 pr-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">
            {isPlaying ? "Currently Listening" : "Spotify"}
          </p>
          {isPlaying && track ? (
            <>
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate hover:underline"
              >
                {track.title}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {track.artist}
              </p>
            </>
          ) : (
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Not listening to anything right now
            </p>
          )}
        </div>

        {isPlaying && (
          <div className="hidden sm:flex items-center gap-[0.14rem] h-4 self-center ml-2">
            <span className="w-1 h-full bg-[#1DB954] rounded-full animate-bounce [animation-delay:-0.2s]"></span>
            <span className="w-1 h-3/4 bg-[#1DB954] rounded-full animate-bounce [animation-delay:-0.4s]"></span>
            <span className="w-1 h-full bg-[#1DB954] rounded-full animate-bounce [animation-delay:-0.1s]"></span>
            <span className="w-1 h-1/2 bg-[#1DB954] rounded-full animate-bounce [animation-delay:-0.5s]"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyCurrentlyListening;
