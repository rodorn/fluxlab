// Test age bucketing logic

const YEAR_NOW = 2026;

const AGE_BUCKETS = [
  { label: "Nowe", from: 0, to: 1 },
  { label: "Do 3 lat", from: 0, to: 3 },
  { label: "3-7 lat", from: 3, to: 7 },
  { label: "7-12 lat", from: 7, to: 12 },
  { label: "12-18 lat", from: 12, to: 18 },
  { label: "Powyżej 18 lat", from: 18, to: 0 },
];

function getBucket(yearTo) {
  const age = YEAR_NOW - yearTo;
  for (const b of AGE_BUCKETS) {
    const fits = age >= b.from && (b.to === 0 || age < b.to);
    if (fits) return b.label;
  }
  return null;
}

describe("age bucketing", () => {
  test("BMW X6 E71 (2008-2014) → 12-18 lat", () => {
    expect(getBucket(2014)).toBe("12-18 lat");
  });

  test("BMW X4 F26 (2014-2018) → 7-12 lat", () => {
    expect(getBucket(2018)).toBe("7-12 lat");
  });

  test("Mercedes GLE C292 (2015-2019) → 3-7 lat", () => {
    expect(getBucket(2019)).toBe("3-7 lat");
  });

  test("Audi Q8 (2018-2025) → Do 3 lat", () => {
    expect(getBucket(2025)).toBe("Do 3 lat");
  });

  test("Toyota Land Cruiser 100 (1998-2007) → Powyżej 18 lat", () => {
    expect(getBucket(2007)).toBe("Powyżej 18 lat");
  });

  test("BMW X5 E53 (1999-2006) → Powyżej 18 lat", () => {
    expect(getBucket(2006)).toBe("Powyżej 18 lat");
  });

  test("Toyota RAV4 XA50 (2018-2024) → Do 3 lat", () => {
    expect(getBucket(2024)).toBe("Do 3 lat");
  });

  test("yearTo=2026 → Nowe", () => {
    expect(getBucket(2026)).toBe("Nowe");
  });

  test("yearTo=2008 → Powyżej 18 lat", () => {
    expect(getBucket(2008)).toBe("Powyżej 18 lat");
  });

  test("yearTo=2023 → Do 3 lat", () => {
    expect(getBucket(2023)).toBe("Do 3 lat");
  });

  test("yearTo=2014 age=12 → 12-18 lat", () => {
    expect(getBucket(2014)).toBe("12-18 lat");
  });

  test("yearTo=2019 age=7 → 7-12 lat", () => {
    expect(getBucket(2019)).toBe("7-12 lat");
  });

  test("all years 1995-2026 land in some bucket", () => {
    for (let y = 1995; y <= 2026; y++) {
      const bucket = getBucket(y);
      expect(bucket).not.toBeNull();
    }
  });

  // Print all assignments for debugging
  test("print all year→bucket assignments", () => {
    for (let y = 2026; y >= 1995; y--) {
      const age = YEAR_NOW - y;
      const bucket = getBucket(y);
      console.log(`yearTo=${y}  age=${age}  → ${bucket}`);
    }
  });
});
