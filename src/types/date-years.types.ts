interface YearInfo {
  year: number;
  description: string;
}

interface DateYearsInfo {
  selected: boolean;
  title?: string;
  day: 1 | 2 | 3 | 4 | 5 | 6;
  month: 6;
  years: YearInfo[];
}

export type { YearInfo, DateYearsInfo };
