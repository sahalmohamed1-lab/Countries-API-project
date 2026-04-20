const {getCountryHTML} = require("../script");

test ("should display country name and capital correctly", () => {
  const data = [
    {
      name: {common: "Kenya"},
      capital: ["Nairobi"],
      region: "Africa"
    }
  ];

  const result = getCountryHTML(data);
  expect(result).toContain("Kenya");
  expect(result).toContain("Nairobi");
});