export const getDeviceInfo = () => {
  const ua = navigator.userAgent;

  const expression = new RegExp("Mobile;\\s+(.+?);\\srv");

  const result = expression.exec(ua);
  return result ? result[1].replace("_", " ") : "Unknown device";
};
