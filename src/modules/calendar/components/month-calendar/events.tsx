import { ElementType, FC } from 'react';
import { FaTasks } from 'react-icons/fa';
import { LuAlarmClock } from 'react-icons/lu';
import { MdEvent } from 'react-icons/md';
import { SiGooglemeet } from 'react-icons/si';

import { cn } from '../../../../shared/lib/utils';
import { EventCategory, ICalendarEvent } from '../../calendar.interface';
import { getTodayEvent } from '../week-calendar/event';

interface MonthCalendarDayEventsProps {
  events: ICalendarEvent[];
  type?: EventCategory;
  icon: ElementType;
  className?: string;
  day: Date;
}

interface MonthCalendarDayEventsGroupProps {
  day: Date;
  events: ICalendarEvent[];
}

const MonthCalendarDayEvents: FC<MonthCalendarDayEventsProps> = ({ events, day, type, className, icon: Icon }) => {
  const e = events.filter((event) => {
    return getTodayEvent(event, day) && event.category === type;
  });

  if (e.length == 0) return null;

  if (e.length <= 1) {
    return (
      <div
        className={cn(
          'flex items-center gap-1 rounded-md p-0.5 text-gray bg-mix-primary-30 justify-between overflow-hidden min-h-4 min-w-4 w-full @max-[8rem]/day:h-5 @max-[3rem]/day:w-auto max-w-full box-border',
          className
        )}>
        <Icon className="shrink-0  @max-[3rem]/day:hidden" />
        <span className="text-sm grow text-center @max-[5rem]/day:hidden @max-[8rem]/day:leading-none  truncate">
          {e.at(0)?.name}
        </span>
        <div className=" @max-[5rem]/day:flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square hidden">
          <p className="text-primary-foreground shrink-0 select-none">{e.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-md p-0.5 text-gray bg-mix-primary-30 justify-between overflow-hidden min-h-4 min-w-4 w-full @max-[8rem]/day:h-5 @max-[3rem]/day:w-auto max-w-full box-border',
        className
      )}>
      <Icon className="shrink-0  @max-[3rem]/day:hidden" />
      <span className="text-sm grow text-center @max-[7rem]/day:hidden @max-[8rem]/day:leading-none truncate">
        {type === 'TASK' ? 'Tasks' : type === 'REMINDER' ? 'Reminders' : 'Meetings'}
      </span>
      <div className="flex items-center justify-center h-full rounded-md text-xs @max-[5rem]/day:text-2xs bg-current shrink-0 aspect-square">
        <p className="text-primary-foreground shrink-0 select-none">{e.length}</p>
      </div>
    </div>
  );
};
export const MonthCalendarDayReminders: FC<MonthCalendarDayEventsGroupProps> = ({ events, day }) => (
  <MonthCalendarDayEvents
    events={events}
    day={day}
    type={EventCategory.REMINDER}
    icon={LuAlarmClock}
    className="text-pink"
  />
);

export const MonthCalendarDayMeetings: FC<MonthCalendarDayEventsGroupProps> = ({ events, day }) => (
  <MonthCalendarDayEvents
    day={day}
    events={events}
    type={EventCategory.ARRANGEMENT}
    icon={SiGooglemeet}
    className="text-yellow"
  />
);

export const MonthCalendarDayTasks: FC<MonthCalendarDayEventsGroupProps> = ({ events, day }) => (
  <MonthCalendarDayEvents events={events} day={day} type={EventCategory.TASK} icon={FaTasks} className="text-green" />
);

export const MonthCalendarDayOccasions: FC<MonthCalendarDayEventsGroupProps> = ({ events, day }) => (
  <MonthCalendarDayEvents
    events={events}
    day={day}
    type={EventCategory.OCCASION}
    icon={MdEvent}
    className="text-purple"
  />
);
