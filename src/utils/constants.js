// src/utils/constants.js

export const PAGES = {
  LANDING: 'landing',
  WORK: 'work',
  ABOUT: 'about',
  OCEAN: 'ocean',
  POETRY_IN_MOTION: 'poetry-in-motion',
  MPHEPO: 'mphepo'
};

export const STORY_PAGES = [
  PAGES.OCEAN,
  PAGES.POETRY_IN_MOTION,
  PAGES.MPHEPO
];

export const WORK_ITEMS = [
  {
    id: PAGES.OCEAN,
    title: 'The Ocean',
    imageSrc: './assets/images/ocean.jpeg',
    bgClass: 'bg-gray-900'
  },
  {
    id: PAGES.POETRY_IN_MOTION,
    title: 'Poetry in Motion',
    imageSrc: './assets/images/solo.jpeg',
    bgClass: 'bg-gray-700'
  },
  {
    id: PAGES.MPHEPO,
    title: 'Mphepo',
    imageSrc: './assets/images/tree.jpeg',
    bgClass: 'bg-gray-600'
  }
];

export const ASSETS = {
  images: {
    landing: {
      image1: './assets/images/1.png',
      image2: './assets/images/2.png',
      image3: './assets/images/3.png'
    },
    about: {
      background: './assets/images/background.jpeg'
    },
    stories: {
      ocean: './assets/images/ocean.jpeg',
      solo: './assets/images/solo.jpeg',
      tree: './assets/images/tree.jpeg'
    }
  },
  audio: {
    ocean: './assets/audio/ocean-ambient.mp3',
    poetry: './assets/audio/poetry-ambient.mp3',
    mphepo: './assets/audio/mphepo-ambient.mp3'
  }
};

export const KEYBOARD_KEYS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  ESCAPE: 'Escape'
};

export const ANIMATION_DELAYS = {
  FAST: 0.2,
  MEDIUM: 0.5,
  SLOW: 1
};