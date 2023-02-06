async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",

    /* valid reasons: 
    AUDIO_PLAYBACK, 
    BLOBS, 
    CLIPBOARD, 
    DISPLAY_MEDIA, 
    DOM_PARSER, 
    DOM_SCRAPING, 
    IFRAME_SCRIPTING,
    TESTING, 
    USER_MEDIA, 
    WEB_RTC.
    */
    reasons: ["IFRAME_SCRIPTING"],
    justification: "Load Trezor",
  });
}

chrome.runtime.onMessage.addListener(async (msg) => {
  switch (msg.type) {
    case "getAddressRequest":
      await createOffscreen();
      await chrome.runtime.sendMessage({
        type: "getAddressRequest",
        offscreen: true,
      });
      break;
  }
});

chrome.runtime.onMessage.addListener(async (msg) => {
  switch (msg.type) {
    case "getAddressResponse":
      console.log("GET ADDRESS RESPONSE WORKER", msg.payload);

      chrome.storage.session.set({ trezorAddress: msg.payload.payload.address }).then(() => {
        console.log("Value is set to " + msg.payload.payload.address);
      });
      
      // chrome.storage.session.get(["key"]).then((result) => {
      //   console.log("Value currently is " + result.key);
      // });

      // await chrome.runtime.sendMessage({
      //   type: "getAddressResponsePopUp",
      //   payload: msg.payload,
      // });

      break;
  }
});
