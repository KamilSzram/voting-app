import { Candidate, Voter } from 'model';

export const voters: Voter[] = [
  {
    id: 1,
    name: 'John Doe',
    hasVoted: false,
  },
  {
    id: 2,
    name: 'John Doe 2',
    hasVoted: true,
  },
  {
    id: 3,
    name: 'Jane Doe',
    hasVoted: false,
  },
  {
    id: 4,
    name: 'Jane Doe 2',
    hasVoted: true,
  },
];

export const candidates: Candidate[] = [
  {
    id: 1,
    name: 'John Doe',
    votes: 3,
  },
  {
    id: 2,
    name: 'John Doe 2',
    votes: 1,
  },
];

export const fakeLocalStorage = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();
