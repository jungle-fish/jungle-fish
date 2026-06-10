"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MusicIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * MVP playlist — replace video IDs when client provides Suno / YouTube links.
 * Architecture supports swapping to a dedicated audio source later.
 */
const PLAYLIST = [
  { id: "placeholder-1", videoId: "nDq6TstdEi8", label: "Forest ambience" },
  { id: "placeholder-2", videoId: "eKFTSSKC7WA", label: "Water sounds" },
  { id: "placeholder-3", videoId: "1ZYbU82GVz4", label: "Birdsong" },
] as const;

export function FloatingAudioPlayer() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentTrack = PLAYLIST[trackIndex];

  const sendCommand = useCallback(
    (func: "playVideo" | "pauseVideo") => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "*",
      );
    },
    [],
  );

  const handlePlayPause = () => {
    if (!playing) {
      setPlaying(true);
      sendCommand("playVideo");
      return;
    }
    setPlaying(false);
    sendCommand("pauseVideo");
  };

  const goToTrack = (index: number) => {
    setTrackIndex(index);
    setPlaying(true);
  };

  const handlePrevious = () => {
    goToTrack((trackIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleNext = () => {
    goToTrack((trackIndex + 1) % PLAYLIST.length);
  };

  return (
    <>
      {playing && (
        <iframe
          ref={iframeRef}
          key={currentTrack.videoId}
          title="Background audio"
          src={`https://www.youtube.com/embed/${currentTrack.videoId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&playsinline=1`}
          allow="autoplay"
          className="pointer-events-none fixed -left-[9999px] h-px w-px opacity-0"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed bottom-5 right-5 z-40 w-[min(100vw-2.5rem,20rem)]"
      >
        <div className="overflow-hidden rounded-2xl border border-jungle-700/30 bg-jungle-950/90 text-jungle-100 shadow-xl shadow-jungle-950/30 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-jungle-800 text-lagoon-300">
              <MusicIcon className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-jungle-400">{t.audio.nowPlaying}</p>
              <p className="truncate text-sm font-medium text-white">
                {currentTrack.label}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="rounded-lg px-2 py-1 text-xs text-jungle-300 hover:bg-jungle-800"
              aria-expanded={expanded}
            >
              {t.audio.playlist}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 border-t border-jungle-800/60 px-4 py-3">
            <button
              type="button"
              onClick={handlePrevious}
              className="rounded-full p-2 text-jungle-300 transition-colors hover:bg-jungle-800 hover:text-white"
              aria-label={t.audio.previous}
            >
              <SkipBackIcon className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handlePlayPause}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-jungle-700 text-white transition-colors hover:bg-jungle-600"
              aria-label={playing ? t.audio.pause : t.audio.play}
            >
              {playing ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="rounded-full p-2 text-jungle-300 transition-colors hover:bg-jungle-800 hover:text-white"
              aria-label={t.audio.next}
            >
              <SkipForwardIcon className="h-4 w-4" />
            </button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-jungle-800/60"
              >
                {PLAYLIST.map((track, index) => (
                  <li key={track.id}>
                    <button
                      type="button"
                      onClick={() => goToTrack(index)}
                      className={cn(
                        "flex w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-jungle-800/60",
                        index === trackIndex
                          ? "text-lagoon-300"
                          : "text-jungle-200",
                      )}
                    >
                      {track.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
