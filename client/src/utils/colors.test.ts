import {
  lighten,
  darken,
  isHsl,
  parseHslValues,
  createHslString,
} from "./colors";

describe("Utils:colors", () => {
  const hslString = "hsl(284, 11%, 26%)";
  const hslStringValues = {
    h: 284,
    s: 11,
    l: 26,
  };
  const hslaString = "hsla(284, 11%, 26%, 1)";
  const hslaStringValues = {
    h: 284,
    s: 11,
    l: 26,
    a: 1,
  };

  describe("isHsl", () => {
    it("Should return true if hsl or hsla value is passed", () => {
      expect(isHsl(hslString)).toBeTruthy();
      expect(isHsl(hslaString)).toBeTruthy();
    });
    it("Should return false if non hsl value is passed", () => {
      expect(isHsl("rgb(200,255,100)")).toBeFalsy();
    });
  });

  describe("parseHslValues", () => {
    it("Should return hsl values as an object", () => {
      expect(parseHslValues(hslString)).toEqual({
        ...hslStringValues,
        ...{ a: null },
      });
    });
    it("Should return hsla values as an object", () => {
      expect(parseHslValues(hslaString)).toEqual(hslaStringValues);
    });
  });

  describe("createHslString", () => {
    it("Should return correctly formed hsl string", () => {
      expect(createHslString({ ...hslStringValues, ...{ a: null } })).toEqual(
        hslString
      );
    });

    it("Should return correctly formed hsla string", () => {
      expect(createHslString(hslaStringValues)).toEqual(hslaString);
    });
  });

  describe("lighten", () => {
    it("Should correctly lighten hsl color by 10%", () => {
      expect(lighten("hsl(100,10%,100%)", 10)).toEqual("hsl(100, 10%, 90%)");
    });

    it("Should correctly lighten hsla color by 10%", () => {
      expect(lighten("hsla(100,10%,100%, 1)", 10)).toEqual(
        "hsla(100, 10%, 90%, 1)"
      );
    });
  });

  describe("darken", () => {
    it("Should correctly darken hsl color by 10%", () => {
      expect(darken("hsl(100,10%,90%)", 10)).toEqual("hsl(100, 10%, 99%)");
    });

    it("Should correctly darken hsla color by 10%", () => {
      expect(darken("hsla(100,10%,90%, 1)", 10)).toEqual(
        "hsla(100, 10%, 99%, 1)"
      );
    });
  });
});
