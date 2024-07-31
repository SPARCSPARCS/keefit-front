export const isLocal = () => {
  const whitelist = ["localhost", "10.10.0.13"];
  if (whitelist.includes(location.hostname)) {
    return true;
  }
  return false;
};
