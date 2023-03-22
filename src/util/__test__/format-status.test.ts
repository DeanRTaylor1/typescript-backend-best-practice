import clc from "cli-color";
import { formatMethod, formatStatus } from "../log-format";

describe("formatStatus", () => {
  it("returns the correct formatted string for status >= 500", () => {
    expect(formatStatus(500)).toBe(clc.bgRed(` 500 `));
  });

  it("returns the correct formatted string for status >= 400", () => {
    expect(formatStatus(400)).toBe(clc.bgYellow(` 400 `));
  });

  it("returns the correct formatted string for status >= 300", () => {
    expect(formatStatus(300)).toBe(clc.bgCyan(` 300 `));
  });

  it("returns the correct formatted string for status >= 200", () => {
    expect(formatStatus(200)).toBe(clc.bgGreen(` 200 `));
  });

  it("returns the correct formatted string for status < 200", () => {
    expect(formatStatus(100)).toBe(clc.bgBlack());
  });
});

describe("formatMethod", () => {
  it("returns the correct formatted string for method 'GET'", () => {
    expect(formatMethod("GET")).toBe(clc.bgBlueBright(` GET      =>`));
  });

  it("returns the correct formatted string for method 'POST'", () => {
    expect(formatMethod("POST")).toBe(clc.bgCyan(` POST     =>`));
  });

  it("returns the correct formatted string for method 'PUT'", () => {
    expect(formatMethod("PUT")).toBe(clc.bgYellow(` PUT      =>`));
  });

  it("returns the correct formatted string for method 'PATCH'", () => {
    expect(formatMethod("PATCH")).toBe(clc.bgMagenta(` PATCH    =>`));
  });

  it("returns the correct formatted string for method 'DELETE'", () => {
    expect(formatMethod("DELETE")).toBe(clc.bgRed(` DELETE   =>`));
  });

  it("returns the correct formatted string for unknown method", () => {
    expect(formatMethod("UNKNOWN")).toBe(clc.bgBlack());
  });
});
