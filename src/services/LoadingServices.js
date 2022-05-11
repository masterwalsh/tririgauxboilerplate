import { computeLoading } from "../utils";

const loadingMap = new Map();
const subscribers = [];

export function setLoading(key, loading) {
  loadingMap.set(key, loading);
  subscribers.forEach((subscriber) => {
    subscriber(computeLoading(loadingMap));
  });
}

export function addSubscriber(subscriber) {
  subscribers.push(subscriber);
}
