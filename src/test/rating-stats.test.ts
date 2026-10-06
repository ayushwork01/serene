import { describe, expect, it } from "vitest";
import { ratingStats, type Review } from "@/lib/serene-store";

const r = (productId: number, rating: number): Review => ({ productId, rating, packagingType: "Sachet", reviewText: "", date: "" });

describe("ratingStats", () => {
  it("only counts reviews for the given cream", () => {
    const s = ratingStats([r(1, 5), r(1, 4), r(2, 1)], 1);
    expect(s.count).toBe(2);
    expect(s.average).toBe(4.5);
  });
  it("builds a 5-to-1 star distribution", () => {
    const s = ratingStats([r(3, 5), r(3, 5), r(3, 2)], 3);
    expect(s.distribution).toEqual([
      { stars: 5, count: 2 }, { stars: 4, count: 0 }, { stars: 3, count: 0 }, { stars: 2, count: 1 }, { stars: 1, count: 0 },
    ]);
  });
  it("is zero with no ratings", () => {
    expect(ratingStats([], 4).average).toBe(0);
  });
});

import { futureStats } from "@/lib/serene-store";
describe("futureStats", () => {
  it("total interested counts only 'Yes' answers", () => {
    const s = futureStats([{ answer: "Yes" }, { answer: "Yes" }, { answer: "Maybe" }, { answer: "Not sure yet" }]);
    expect(s).toEqual({ yes: 2, maybe: 1, notSure: 1, totalInterested: 2 });
  });
});
