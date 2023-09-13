/**
 * @params {string} path
 */
export function navigate(path) {
  const push = new CustomEvent("pushRoute", {
    detail: {
      path,
    },
  });

  document.dispatchEvent(push);
}
