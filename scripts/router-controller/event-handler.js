/**
 * @param {string} path
 */

async function insertContent(path) {
  const content = await fetch(`./pages/${path}.html`);
  const html = await content.text();

  document.body.innerHTML = html;

  const script = document.createElement("script");
  script.async = false;
  script.type = "module";
  script.src = `scripts/${path}.js`;

  document.body.appendChild(script);
}

document.addEventListener("pushRoute", async (event) => {
  const path = event.detail.path;

  insertContent(path);
});

insertContent("login");
