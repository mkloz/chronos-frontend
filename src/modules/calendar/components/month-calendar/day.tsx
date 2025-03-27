import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '../../../../shared/lib/utils';
import { ICalendarEvent } from '../../calendar.interface';
import { useDatePicker } from '../../stores/date-picker-store';
import {
  MonthCalendarDayMeetings,
  MonthCalendarDayOccasions,
  MonthCalendarDayReminders,
  MonthCalendarDayTasks
} from './events';

interface MonthCalendarDayProps {
  day: Date;
  events: ICalendarEvent[];
  isActualMonth: boolean;
  hideEvents?: boolean;
}

export const MonthCalendarDay: FC<MonthCalendarDayProps> = ({ day, events, isActualMonth, hideEvents = false }) => {
  const { store } = useDatePicker();
  const nav = useNavigate();

  return (
    <button
      onClick={() => {
        nav('/calendar');
        store?.setSelectedDate({ from: day });
      }}
      className={cn(
        ' @container/day flex flex-col gap-2 rounded-2xl border text-secondary-foreground p-1  @max-[3rem]:gap-0.5 justify-center aspect-square hover:bg-accent transition-colors hover:border-accent-foreground cursor-pointer',
        !isActualMonth &&
          'bg-[repeating-linear-gradient(135deg,var(--color-background),var(--color-background)_10px,var(--color-border)_10px,var(--color-border)_20px)] text-accent-foreground',
        dayjs(day).isToday() && 'text-primary-foreground bg-primary hover:bg-neutral-500'
      )}>
      <div className={cn('flex flex-col items-center gap-1  min-h-22 w-full max-w-full', hideEvents && 'hidden')}>
        <MonthCalendarDayTasks events={events} day={day} />
        <MonthCalendarDayMeetings events={events} day={day} />
        <MonthCalendarDayReminders events={events} day={day} />
        <MonthCalendarDayOccasions events={events} day={day} />
      </div>
      <p
        className={cn(
          'w-full @max-[6rem]:text-sm  @max-[3rem]:text-xs text-center text-lg font-semibold',
          !hideEvents && 'mt-auto'
        )}>
        {dayjs(day).format('D')}
      </p>
    </button>
  );
};
