"use client";

// Six single-character boxes that behave like one code field:
// typing moves forward, backspace moves back, and pasting a full code fills it.
import { useRef } from "react";

const LENGTH = 6;

export default function OtpInput({ value, onChange, onComplete, disabled = false }) {
  const boxes = useRef([]);

  const digits = value.padEnd(LENGTH, " ").slice(0, LENGTH).split("");

  const focusBox = (index) => {
    const box = boxes.current[Math.min(Math.max(index, 0), LENGTH - 1)];
    box?.focus();
    box?.select();
  };

  const push = (next) => {
    onChange(next);
    if (next.length === LENGTH) onComplete?.(next);
  };

  const handleChange = (index, raw) => {
    const typed = raw.replace(/\D/g, "");
    if (!typed) return;

    // Handles both a single keystroke and a code pasted into one box
    const chars = value.split("");
    for (let i = 0; i < typed.length && index + i < LENGTH; i++) {
      chars[index + i] = typed[i];
    }

    const next = chars.join("").slice(0, LENGTH);
    push(next);
    focusBox(index + typed.length);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const chars = value.padEnd(LENGTH, " ").split("");

      if (chars[index]?.trim()) {
        chars[index] = " ";
        push(chars.join("").trimEnd());
        return;
      }

      chars[index - 1] = " ";
      push(chars.join("").trimEnd());
      focusBox(index - 1);
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(index - 1);
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    push(pasted);
    focusBox(pasted.length);
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            boxes.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={LENGTH}
          disabled={disabled}
          value={digit.trim()}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          aria-label={`Digit ${index + 1} of ${LENGTH}`}
          className="input-field h-12 w-11 text-center text-xl font-bold sm:h-14 sm:w-12 sm:text-2xl"
        />
      ))}
    </div>
  );
}

export { LENGTH as OTP_LENGTH };
