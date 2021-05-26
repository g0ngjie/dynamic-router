import { randomInt } from "@alrale/common-lib";

const Svgs = [
  "dashboard",
  "download",
  "drag",
  "dustbin",
  "example",
  "eye-open",
  "eye",
  "form",
  "link",
  "nested",
  "password",
  "question",
  "table",
  "tree",
  "user",
];

/**
 * 随机获取svg
 */
export function randomAcquisition() {
  const len = Svgs.length;
  const index = randomInt(len - 1);
  return Svgs[index];
}
