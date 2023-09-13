import { toast } from "./components/toast.js";

function getTruncateAddress(size = 15) {
  const firstPart = address.slice(0, size);
  const lastPart = address.slice(-size);

  return `${firstPart}...${lastPart}`;
}

const text = document.querySelector("#address-text");
const button = document.querySelector("#copy-address");
(async function () {
  try {
    const address = await window.kleverWeb.getWalletAddress();
    text.innerText = getTruncateAddress(address);

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(address);

      toast({
        title: getTruncateAddress(address),
      });
    });
  } catch (error) {
    toast({
      title: error,
      variant: "destructive",
    });

    text.innerText = "N/A";
    button.disabled = true;
  }
})();
