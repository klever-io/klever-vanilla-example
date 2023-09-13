import { toast } from "./components/toast.js";
import { signMessage } from "./config/index.js";
import { navigate } from "./router-controller/index.js";

const form = document.querySelector("#sign-in-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = document.querySelector("#sign-in-button");
  button.disabled = true;

  try {
    if (typeof window === "undefined" || !window.kleverWeb) {
      throw Error("Klever Extension not found");
    }

    await window.kleverWeb.initialize();
    const address = window.kleverWeb.getWalletAddress();
    if (!address) {
      throw Error("Cannot retrieve wallet address");
    }

    const message = await window.kleverWeb.signMessage(signMessage);
    const result = await window.kleverWeb.validateSignature(
      signMessage,
      message,
      address
    );

    if (!result) {
      throw Error("Invalid signature");
    }

    navigate("send");
  } catch (error) {
    toast({
      variant: "destructive",
      title: error,
    });
  }

  button.disabled = false;
});
