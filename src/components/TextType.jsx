import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./TextType.css";

export default function TextType({
  text,
  texts,
  as: Tag = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  variableSpeedEnabled = false,
  variableSpeedMin = 35,
  variableSpeedMax = 120,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) {
  const elementTag = typeof Tag === "string" ? Tag : "div";
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [hasStarted, setHasStarted] = useState(initialDelay <= 0);
  const [containerEl, setContainerEl] = useState(null);
  const timeoutRef = useRef(null);
  const sentenceCompleteRef = useRef(false);

  const textArray = useMemo(() => {
    const source = Array.isArray(text) && text.length > 0 ? text : texts;
    if (Array.isArray(source)) {
      return source.filter((item) => typeof item === "string" && item.length > 0);
    }
    if (typeof source === "string" && source.length > 0) {
      return [source];
    }
    return [];
  }, [text, texts]);

  const resolvedVariableSpeed = useMemo(() => {
    if (variableSpeed && typeof variableSpeed === "object") {
      return {
        enabled: true,
        min: Number(variableSpeed.min) || variableSpeedMin,
        max: Number(variableSpeed.max) || variableSpeedMax,
      };
    }

    return {
      enabled: Boolean(variableSpeedEnabled),
      min: Number(variableSpeedMin) || 35,
      max: Number(variableSpeedMax) || 120,
    };
  }, [variableSpeed, variableSpeedEnabled, variableSpeedMin, variableSpeedMax]);

  const getTypingDelay = useCallback(() => {
    if (!resolvedVariableSpeed.enabled) {
      return typingSpeed;
    }

    const min = Math.max(1, Math.min(resolvedVariableSpeed.min, resolvedVariableSpeed.max));
    const max = Math.max(min, resolvedVariableSpeed.max);
    return Math.random() * (max - min) + min;
  }, [resolvedVariableSpeed, typingSpeed]);

  const getCurrentTextColor = useCallback(() => {
    if (textColors.length === 0) {
      return "inherit";
    }
    return textColors[currentTextIndex % textColors.length] || "inherit";
  }, [currentTextIndex, textColors]);

  useEffect(() => {
    if (!startOnVisible || !containerEl) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerEl);
    return () => observer.disconnect();
  }, [containerEl, startOnVisible]);

  useEffect(() => {
    if (!isVisible || hasStarted || textArray.length === 0) {
      return undefined;
    }

    timeoutRef.current = window.setTimeout(() => {
      setHasStarted(true);
    }, initialDelay);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [hasStarted, initialDelay, isVisible, textArray.length]);

  useEffect(() => {
    if (!isVisible || !hasStarted || textArray.length === 0) {
      return undefined;
    }

    const currentText = textArray[currentTextIndex] || "";
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    timeoutRef.current = window.setTimeout(() => {
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCurrentCharIndex((prev) => Math.max(prev - 1, 0));
          return;
        }

        if (onSentenceComplete) {
          onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
        }

        sentenceCompleteRef.current = false;
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        setCurrentCharIndex(0);
        return;
      }

      if (currentCharIndex < processedText.length) {
        sentenceCompleteRef.current = false;
        setDisplayedText((prev) => prev + processedText[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
        return;
      }

      if (loop) {
        setIsDeleting(true);
      } else if (onSentenceComplete && !sentenceCompleteRef.current) {
        sentenceCompleteRef.current = true;
        onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
      }
    }, isDeleting ? deletingSpeed : currentCharIndex < processedText.length ? getTypingDelay() : pauseDuration);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [
    currentCharIndex,
    currentTextIndex,
    deletingSpeed,
    displayedText,
    getTypingDelay,
    hasStarted,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    reverseMode,
    textArray,
  ]);

  const currentRawText = textArray[currentTextIndex] || "";
  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < currentRawText.length || isDeleting);

  return createElement(
    elementTag,
    {
      ref: setContainerEl,
      className: `text-type ${className}`.trim(),
      ...props,
    },
    createElement(
      "span",
      { className: "text-type__content", style: { color: getCurrentTextColor() } },
      displayedText
    ),
    showCursor
      ? createElement(
          "span",
          {
            className: `text-type__cursor ${cursorClassName} ${
              shouldHideCursor ? "text-type__cursor--hidden" : ""
            }`.trim(),
            style: { animationDuration: `${cursorBlinkDuration}s` },
          },
          cursorCharacter
        )
      : null
  );
}
