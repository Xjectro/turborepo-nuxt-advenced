import "colors";

const originalInfo = console.info;

const date = new Date();
const formattedDate = date
  .toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
  .replace(",", "");

console.info = (...args: any[]) => {
  originalInfo.call(console, `${`[${formattedDate}]`.gray}🌟`, ...args);
};

console.warn = (...args: any[]) => {
  originalInfo.call(console, `${`[${formattedDate}]`.gray}⚠️`, ...args);
};

console.log = (...args: any[]) => {
  originalInfo.call(console, `${`[${formattedDate}]`.gray}📢`, ...args);
};
