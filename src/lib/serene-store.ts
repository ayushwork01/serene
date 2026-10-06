// import { useCallback, useEffect, useState } from "react";

// export type Packaging = "Cream" | "Sachet" | "Dabba";
// export type Review = { productId: number; rating: number; packagingType: Packaging; reviewText: string; date: string };
// export type TrialInterest = { productId: number; interested: boolean; date: string };
// export type FutureAnswer = "Yes" | "Maybe" | "Not sure yet";
// export type KitSelection = { items: string[]; date: string };

// export type SereneData = {
//   reviews: Review[];
//   trialInterest: TrialInterest[];
//   futureInterest: { answer: FutureAnswer; date: string }[];
//   kits: KitSelection[];
// };

// const KEY = "serene-data-v1";
// const empty: SereneData = { reviews: [], trialInterest: [], futureInterest: [], kits: [] };
// const listeners = new Set<(d: SereneData) => void>();

// function read(): SereneData {
//   try {
//     const raw = localStorage.getItem(KEY);
//     return raw ? { ...empty, ...JSON.parse(raw) } : empty;
//   } catch {
//     return empty;
//   }
// }

// // Local-only persistence. Swap these functions for a backend later.
// export function useSereneData() {
//   const [data, setData] = useState<SereneData>(empty);
//   useEffect(() => {
//     setData(read());
//     listeners.add(setData);
//     return () => void listeners.delete(setData);
//   }, []);
//   const update = useCallback((fn: (d: SereneData) => SereneData) => {
//     const next = fn(read());
//     localStorage.setItem(KEY, JSON.stringify(next));
//     listeners.forEach((l) => l(next));
//   }, []);
//   return { data, update };
// }

// export function ratingStats(reviews: Review[], productId: number) {
//   const list = reviews.filter((r) => r.productId === productId);
//   const distribution = [5, 4, 3, 2, 1].map((s) => ({ stars: s, count: list.filter((r) => r.rating === s).length }));
//   const average = list.length ? list.reduce((a, r) => a + r.rating, 0) / list.length : 0;
//   return { count: list.length, average: Math.round(average * 10) / 10, distribution, reviews: list.slice().reverse() };
// }

// /** Future-interest poll counts. "Total interested" counts only "Yes" answers. */
// export function futureStats(list: { answer: FutureAnswer }[]) {
//   const yes = list.filter((f) => f.answer === "Yes").length;
//   const maybe = list.filter((f) => f.answer === "Maybe").length;
//   const notSure = list.filter((f) => f.answer === "Not sure yet").length;
//   return { yes, maybe, notSure, totalInterested: yes };
// }
import { useCallback, useEffect, useState } from "react";

export type Packaging = "Cream" | "Sachet";

export type Review = {
  productId: number;
  rating: number;
  packagingType: Packaging;
  reviewText: string;
  date: string;
};

export type TrialInterest = {
  productId: number;
  interested: boolean;
  date: string;
};

export type FutureAnswer = "Yes" | "Maybe" | "Not sure yet";

export type KitSelection = {
  items: string[];
  date: string;
};

/* =========================
   CART
========================= */

export type CartItem = {
  key: string;
  productId: number;
  productName: string;
  format: Packaging;
  image: string;
  quantity: number;
  date: string;
};

export type SereneData = {
  reviews: Review[];
  trialInterest: TrialInterest[];
  futureInterest: {
    answer: FutureAnswer;
    date: string;
  }[];
  kits: KitSelection[];

  /* NEW */
  cart: CartItem[];
};

const KEY = "serene-data-v1";

const empty: SereneData = {
  reviews: [],
  trialInterest: [],
  futureInterest: [],
  kits: [],

  /* NEW */
  cart: [],
};

const listeners = new Set<(d: SereneData) => void>();

function read(): SereneData {
  try {
    const raw = localStorage.getItem(KEY);

    if (!raw) {
      return empty;
    }

    return {
      ...empty,
      ...JSON.parse(raw),
    };
  } catch {
    return empty;
  }
}

/* Local-only persistence. Swap these functions for a backend later. */
export function useSereneData() {
  const [data, setData] = useState<SereneData>(empty);

  useEffect(() => {
    setData(read());

    listeners.add(setData);

    return () => void listeners.delete(setData);
  }, []);

  const update = useCallback(
    (fn: (d: SereneData) => SereneData) => {
      const next = fn(read());

      localStorage.setItem(KEY, JSON.stringify(next));

      listeners.forEach((l) => l(next));
    },
    []
  );

  return {
    data,
    update,
  };
}

/* =========================
   RATING STATS
========================= */

export function ratingStats(
  reviews: Review[],
  productId: number
) {
  const list = reviews.filter(
    (r) => r.productId === productId
  );

  const distribution = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: list.filter((r) => r.rating === s).length,
  }));

  const average = list.length
    ? list.reduce((a, r) => a + r.rating, 0) / list.length
    : 0;

  return {
    count: list.length,
    average: Math.round(average * 10) / 10,
    distribution,
    reviews: list.slice().reverse(),
  };
}

/* =========================
   FUTURE INTEREST STATS
========================= */

/** Future-interest poll counts.
 * "Total interested" counts only "Yes" answers.
 */
export function futureStats(
  list: { answer: FutureAnswer }[]
) {
  const yes = list.filter(
    (f) => f.answer === "Yes"
  ).length;

  const maybe = list.filter(
    (f) => f.answer === "Maybe"
  ).length;

  const notSure = list.filter(
    (f) => f.answer === "Not sure yet"
  ).length;

  return {
    yes,
    maybe,
    notSure,
    totalInterested: yes,
  };
}