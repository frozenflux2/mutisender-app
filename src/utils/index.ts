export const truncate = (addr) => {
  const sep = "...";
  const front = addr.substr(0, 10);
  const back = addr.substr(addr.length - 4);
  return front + sep + back;
};
