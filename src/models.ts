type BaseType = {
  label: string;
};

export type Student = BaseType & {};

/**
 * @desc Describes when the class will occour
 *
 * @field frequency how frequently the class repeats
 * @field startMinute minute of the day, from 0 to 1440
 * @field endMinute minute of the day, from 0 to 1440
 * @field dayOfWeek used only if frequecy is weekly
 * @field dayOfMonth used only if frequecy is monthly or yearly
 * @field month used only if frequency is yearly
 */
export type Schedules = BaseType & {
  frequency: "none" | "daily" | "weekly" | "15days" | "monthly" | "yearly";
  startMinute: number;
  endMinute: number;
  dayOfWeek?: number;
  dayOfMonth?: number;
  month?: number;
};

export type Class = BaseType & {
  schedules: Schedules[];
};
