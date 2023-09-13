/**
 * @param {string} path
 */

async function insertContent(path) {
  const content = await fetch(`./pages/${path}.html`);
  const html = await content.text();

  document.body.innerHTML = html;
}

document.addEventListener("pushRoute", async (event) => {
  const path = event.detail.path;

  insertContent(path);
});

insertContent("login");
