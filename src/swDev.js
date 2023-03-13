export default function swDec() {
  function getVapidKey() {
    const vapidKeys =
      "BJBreo0ak6WcZH29VCJPU1Ltw8zOy3GVtxe8A23yoLZr6-tNyOMvXJAUy9opfn_5hn4WBc83GqG0PMnkhn_zlAc";
    return urlBase64ToUint8Array(vapidKeys);
  }
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((res) => {
    console.warn("response", res);
    return res.pushManager.getSubscription().then(function (subcription) {
      return res.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: getVapidKey(),
      });
    });
  });
}
