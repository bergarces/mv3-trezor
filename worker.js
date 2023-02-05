async function createOffscreen() {
  //console.log('AAAAAAAAAAA', chrome.offscreen)
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
    case "start":
      await createOffscreen();
      await chrome.runtime.sendMessage({
        type: "start",
        offscreen: true,
      });
      break;
  }
});