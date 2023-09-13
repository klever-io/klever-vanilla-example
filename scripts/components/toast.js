/**
 * @typedef {object} Config
 * @property {string} title
 * @property {string} variant
 * @property {(string|undefined)} destination
 */

/**
 * @params {string} variant
 * @returns {object}
 */
function getVariant(variant) {
  let style = {
    borderRadius: ".5rem",
    border: "1px solid #cbd5e1",
    background: "white",
    color: "#0f172a",
    fontWeight: "500",
    fontSize: ".9rem",
    boxShadow:
      "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
  };

  if (variant === "destructive") {
    style = {
      ...style,
      background: "#ef4444",
      border: "1px solid #ef4444",
      color: "#f8fafc",
    };
  }

  return style;
}

/**
 * @params {Config} config
 */
export function toast({ title, variant = "default", destination }) {
  const instance = Toastify({
    text: title,
    gravity: "bottom",
    style: getVariant(variant),
    ...(destination && { destination }),
  });

  instance.showToast();
}
