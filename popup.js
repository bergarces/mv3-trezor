document.querySelector(".init-btn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "TZInit" });
});

document.querySelector(".address-btn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "TZGetAddress" });
});

document.querySelector(".sign-btn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "TZSignMessage" });
});

setInterval(() => {
  chrome.storage.session.get(["trezorInit"]).then((result) => {
    document.querySelector(".init-label").innerHTML = result.trezorInit
      ? "Initialised"
      : "Not initialised";
  });

  chrome.storage.session.get(["trezorAddress"]).then((result) => {
    document.querySelector(".address-label").innerHTML =
      result.trezorAddress || "No Address";
  });

  chrome.storage.session.get(["trezorSignature"]).then((result) => {
    document.querySelector(".sign-label").innerHTML =
      result.trezorSignature || "No Signature";
  });
}, 1000 / 2);
