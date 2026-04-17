const { getCountryHTML } = require("../script");

describe("Country App Tests", () => {

  test("renders country name", () => {
    const data = [
      {
        name: { common: "Kenya" },
        capital: ["Nairobi"],
        region: "Africa"
      }
    ];

    const result = getCountryHTML(data);
    expect(result).toContain("Kenya");
  });

  test("renders capital correctly", () => {
    const data = [
      {
        name: { common: "Kenya" },
        capital: ["Nairobi"],
        region: "Africa"
      }
    ];

    const result = getCountryHTML(data);
    expect(result).toContain("Nairobi");
  });

  test("renders region correctly", () => {
    const data = [
      {
        name: { common: "Kenya" },
        capital: ["Nairobi"],
        region: "Africa"
      }
    ];

    const result = getCountryHTML(data);
    expect(result).toContain("Africa");
  });

  test("handles missing capital", () => {
    const data = [
      {
        name: { common: "Testland" },
        region: "Nowhere"
      }
    ];

    const result = getCountryHTML(data);
    expect(result).toContain("N/A");
  });

  test("renders multiple countries", () => {
    const data = [
      {
        name: { common: "Kenya" },
        capital: ["Nairobi"],
        region: "Africa"
      },
      {
        name: { common: "Germany" },
        capital: ["Berlin"],
        region: "Europe"
      }
    ];

    const result = getCountryHTML(data);
    expect(result).toContain("Germany");
  });

});