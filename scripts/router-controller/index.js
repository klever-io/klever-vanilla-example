/**
 * @params {string} path
 * @params {string} title
 */
export function navigate(path, title) {
  if (typeof history.pushState === "undefined") {
    throw Error("History API not supported");
  }

  const route = {
    Title: title,
    Url: path,
  };

  history.pushState(route, title, path);

  const push = new CustomEvent("pushRoute", {
    detail: {
      path,
    },
  });

  document.dispatchEvent(push);
}
