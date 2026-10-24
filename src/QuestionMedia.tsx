import { useEffect, useRef, useState } from "react";
import type { Question } from "./data";

export function QuestionMedia({
  question,
  showAnswer,
}: {
  question: Question;
  showAnswer: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [missingImage, setMissingImage] = useState(false);
  const [missingAudio, setMissingAudio] = useState(false);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const elapsed = useRef(0);
  const duration = (question.revealSeconds ?? 60) * 1000;
  useEffect(() => {
    if (!running || showAnswer) return;
    let frame: number;
    const started = performance.now() - elapsed.current;
    const tick = (now: number) => {
      elapsed.current = Math.min(now - started, duration);
      setProgress(elapsed.current / duration);
      if (elapsed.current >= duration) setRunning(false);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, showAnswer, duration]);
  useEffect(() => {
    if (showAnswer) setRunning(false);
  }, [showAnswer]);
  function restart() {
    elapsed.current = 0;
    setProgress(0);
    setRunning(false);
  }
  return (
    <div className="question-media">
      {question.image && (
        <>
          {!missingImage && (
            <div className={question.reveal ? "reveal-frame" : ""}>
              <img
                className="question-image"
                src={question.image}
                alt={question.reveal ? "Gesuchte Person" : "Bild zur Frage"}
                onLoad={() => {
                  setReady(true);
                  if (question.reveal && !showAnswer) setRunning(true);
                }}
                onError={() => {
                  setMissingImage(true);
                  setRunning(false);
                }}
                style={
                  question.reveal
                    ? {
                        filter: `blur(${showAnswer ? 0 : (1 - progress) * 45}px)`,
                      }
                    : undefined
                }
              />
            </div>
          )}
          {missingImage && (
            <p className="media-warning" role="status">
              Das Bild fehlt. Bitte im Frageneditor hochladen oder die lokale
              Bilddatei ergänzen.
            </p>
          )}
          {question.reveal && (
            <div className="reveal-controls">
              <button
                disabled={!ready || missingImage || showAnswer || progress >= 1}
                onClick={() => setRunning((v) => !v)}
              >
                {running
                  ? "Enthüllung pausieren"
                  : progress > 0
                    ? "Enthüllung fortsetzen"
                    : "Bild langsam enthüllen"}
              </button>
              <button
                disabled={!ready || missingImage || showAnswer}
                onClick={restart}
              >
                Bild zurücksetzen
              </button>
            </div>
          )}
        </>
      )}
      {question.audio && (
        <div className="song-player">
          <span>SONGRUNDE · TITEL & INTERPRET GESUCHT</span>
          <audio
            controls
            preload="metadata"
            src={question.audio}
            onError={() => setMissingAudio(true)}
            aria-label="Song abspielen"
          />
          {missingAudio && (
            <p className="media-warning" role="status">
              MP3 fehlt oder kann nicht abgespielt werden. Bitte im Frageneditor
              eine lokale Audiodatei ergänzen.
            </p>
          )}
        </div>
      )}
      {question.video && (
        <video
          muted
          onVolumeChange={(e) => {
            e.currentTarget.muted = true;
          }}
          controls
          src={question.video}
          preload="metadata"
        />
      )}
    </div>
  );
}
