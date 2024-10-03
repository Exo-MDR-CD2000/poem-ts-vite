// src/types/poemTypes.ts
export interface Poem {
    id?: number;  // Optional for new poems
    title: string;
    author: string;
    lines: string[];
    linecount: string;
  }
