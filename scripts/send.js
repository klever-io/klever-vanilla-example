import { navigate } from "../scripts/router-controller/index.js";
import { toast } from "./components/toast.js";

const routeButton = document.querySelector("#receive-route-button");
routeButton.addEventListener("click", () => {
  navigate("receive");
});

const addressInput = document.querySelector("#address");
const addressError = document.querySelector("#address-error");
addressInput.addEventListener("input", () => {
  if (addressError.textContent.length > 0) {
    addressError.textContent = "";
  }
});

const valueInput = document.querySelector("#value");
const valueError = document.querySelector("#value-error");
valueInput.addEventListener("input", (event) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, "");

  if (valueError.textContent.length > 0) {
    valueError.textContent = "";
  }
});

const form = document.querySelector("#send-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const address = formData.get("address");
  if (!address || address.length !== 62) {
    addressError.textContent = "Address must be 62 characters long";
    return;
  }

  const value = formData.get("value");
  if (!value || isNaN(Number(value))) {
    valueError.textContent = "Value must be a number";
    return;
  }

  const numberValue = Number(value);
  if (numberValue < 0) {
    valueError.textContent = "Value must be positive";
    return;
  }

  const button = document.querySelector("#send-button");
  button.disabled = true;

  try {
    const precision = 6;

    const payload = {
      receiver: address,
      amount: numberValue * 10 ** precision,
      kda: "KLV",
    };

    const unsignedTransaction = await window.kleverWeb.buildTransaction([
      {
        payload,
        type: 0,
      },
    ]);

    const signedTransaction = await window.kleverWeb.signTransaction(
      unsignedTransaction
    );
    const { data, error } = await window.kleverWeb.broadcastTransactions([
      signedTransaction,
    ]);
    if (error.length > 0) {
      throw new Error(error);
    }

    const hash = data.txsHashes[0];

    toast({
      title: "Successfully send value! Click to view transaction.",
      destination: `https://testnet.kleverscan.org/transaction/${hash}`,
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: String(error),
    });
  }

  button.disabled = false;
});
