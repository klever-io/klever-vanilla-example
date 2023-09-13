import { navigate } from "../scripts/router-controller/index.js";
import { toast } from "./components/toast.js";

const routeButton = document.querySelector("#send-route-button");
routeButton.addEventListener("click", () => {
  navigate("send");
});

function getTruncateAddress(address, size = 15) {
  const firstPart = address.slice(0, size);
  const lastPart = address.slice(-size);

  return `${firstPart}...${lastPart}`;
}

const text = document.querySelector("#address-text");
(function () {
  const address = window.kleverWeb.address;
  text.innerText = address ? getTruncateAddress(address) : "N/A";
})();

const button = document.querySelector("#copy-address");
button.addEventListener("click", () => {
  const address = window.kleverWeb.address;
  if (!address) {
    document.querySelector("#copy-address").disabled = true;
    return;
  }

  navigator.clipboard.writeText(address);

  toast({
    title: "Address copied to clipboard",
  });
});
