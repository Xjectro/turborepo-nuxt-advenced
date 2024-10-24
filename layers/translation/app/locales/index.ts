import locales from "~/constants/locales";

export const translations: any = {};
let messages = import.meta.glob("../**/locales/**/*.json", {
  import: "default",
  eager: true,
}) as any;

const keyNameOfLocaleEntry = (filePath: string) => {
  const regex = /\/([^/]+)\.json$/;
  return filePath.match(regex);
};

Object.entries(locales).forEach(([keys, locale]) => {
  translations[locale.code] = {};
});

Object.keys(messages).forEach((key) => {
  const filePath = key;
  const currentFileObj = keyNameOfLocaleEntry(filePath);
  const currentLangKey =
    currentFileObj !== null ? currentFileObj[1] : undefined;

  if (!currentLangKey) {
    console.warn(`currentLangKey is undefined for file: ${filePath}`);
    return;
  }

  const fileJson = JSON.parse(JSON.stringify(Object.entries(messages[key])));
  const currentComponentKey = <string | number>Object.values(fileJson[0])[0];

  if (translations[currentLangKey][currentComponentKey] === undefined) {
    const target = translations[currentLangKey];
    const source = {
      [currentComponentKey]: {},
    };
    Object.assign(target, source);
  }

  const childName = Object.keys(fileJson[0][1])[0];

  if (!childName) {
    console.warn(
      `childName is undefined for component: ${currentComponentKey}`,
    );
    return;
  }

  if (
    translations[currentLangKey][currentComponentKey][childName] === undefined
  ) {
    const componentTarget = translations[currentLangKey][currentComponentKey];
    const componentSource = Object.values(fileJson[0])[1];
    translations[currentLangKey][currentComponentKey] = Object.assign(
      componentTarget,
      componentSource,
    );
  } else {
    const componentTarget =
      translations[currentLangKey][currentComponentKey][childName];
    const parsedSource = JSON.parse(
      JSON.stringify(Object.entries(fileJson[0][1])),
    );
    const componentSource = parsedSource[0][1];
    translations[currentLangKey][currentComponentKey][childName] =
      Object.assign(componentTarget, componentSource);
  }
});

export default translations;
