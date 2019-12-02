import { getInitials } from "./text";

test("getInitials", function() {
  expect(getInitials()).toBe("?");
  expect(getInitials("Morpheus")).toBe("M");
  expect(getInitials("Agent Smith")).toBe("AS");
  expect(getInitials("Thomas A. Anderson")).toBe("TA");
  expect(getInitials("🐇")).toBe("🐇");
  expect(getInitials("White 🐇")).toBe("W🐇");
  expect(getInitials("The 1")).toBe("T1");
});
