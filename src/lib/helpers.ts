export const mergeThemes = (defaultTheme: Theme, theme: ThemeProps): Theme => {
  let finalResult: any = {};

  function isObject(item: any) {
    return item && typeof item === "object" && !Array.isArray(item);
  }

  function overrideDeep(target: any, source: any): any {
    let result = { ...target };

    for (const key in source) {
      if (isObject(source[key]) && key in target) {
        result[key] = overrideDeep(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  if (theme) {
    finalResult = overrideDeep(defaultTheme, theme);
  }

  return finalResult;
};

export const mergeStrings = (s1?: string, s2?: string, d = " ") => {
  return s1 + d + (s2 ?? "");
};

export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substring(2, 8);
  return timestamp + randomNum;
};

export const deepEqual = (obj1: any, obj2: any): boolean => {
  // Check if both are the same object reference or primitive equal values
  if (obj1 === obj2) return true;

  // Check if both are null or undefined
  if (obj1 == null || obj2 == null) return false;

  // Check if both are not objects (primitive values)
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

  // Check if both have different constructors (e.g., Array vs Object)
  if (obj1.constructor !== obj2.constructor) return false;

  // If both are arrays, compare their lengths and elements
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }

  // If both are plain objects, compare their keys and values
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
};
