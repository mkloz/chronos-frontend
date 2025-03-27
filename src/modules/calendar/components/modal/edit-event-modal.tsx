import { Dispatch, FC, SetStateAction } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

import { ICalendarEvent } from '../../calendar.interface';
import { EventParticipants } from '../event-participants';
import { EventAttendeesForm } from '../form/event-attendees-form';
import { EventForm } from '../form/event-form';

interface EditEventModalProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  event: ICalendarEvent | undefined;
}

export const EditEventModal: FC<EditEventModalProps> = ({ open, onClose, event }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[30rem] min-h-[36rem] flex flex-col">
        <DialogHeader>
          <DialogTitle>Update {event?.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="h-full">
          <TabsList className="w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <EventForm event={event} action={'edit'} onSubmit={() => onClose(false)} />
          </TabsContent>

          {event?.id && (
            <TabsContent value="participants">
              <EventParticipants event={event} />
            </TabsContent>
          )}

          {event?.id && (
            <TabsContent value="invitations" className="flex">
              <EventAttendeesForm eventId={event.id} />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
