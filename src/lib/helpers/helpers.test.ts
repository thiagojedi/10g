import { getInitials } from "./text";

test("getInitials", function() {
  expect(getInitials()).toBe("?");
  expect(getInitials("Morpheus")).toBe("M");
  expect(getInitials("Agent Smith")).toBe("AS");
  expect(getInitials("Mr Thomas Anderson")).toBe("MA");
  expect(getInitials("🐇")).toBe("🐇");
  expect(getInitials("White 🐇")).toBe("W🐇");
});
