export const isLocal = () => {
  const whitelist = ["localhost"];
  if (whitelist.includes(location.hostname)) {
    return true;
  }
  return false;
};
