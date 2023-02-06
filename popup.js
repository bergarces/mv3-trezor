document.querySelector(".start").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "getAddressRequest",
  });
});

chrome.runtime.onMessage.addListener(async (msg) => {
  switch (msg.type) {
    case "getAddressResponse":
      console.log("GET ADDRESS RESPONSE POPUP", msg.payload);

      break;
  }
});

console.log("AAAAAAAAAAAAAA", chrome.storage);
chrome.storage.session.get(["trezorAddress"]).then((result) => {
  console.log("Value currently is ", result.trezorAddress);
  document.querySelector(".output").innerHTML =
    result.trezorAddress || "NO ADDRESS";
});
