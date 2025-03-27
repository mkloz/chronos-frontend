import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { MY_CALENDARS } from '@/shared/constants/query-keys';

import { AddCalendarDto, AddCalendarSchema, CalendarVisibility, ICalendar } from '../../calendar.interface';
import { CalendarService } from '../../services/calendar.service';

interface CalendarFormProps {
  onSubmit?: () => void;
  action: 'add' | 'edit';
  calendar?: ICalendar;
  isReadOnly?: boolean;
}

export const CalendarForm: FC<CalendarFormProps> = ({ action, calendar, onSubmit: onSubmitCb, isReadOnly }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isValid, errors }
  } = useForm<AddCalendarDto>({
    resolver: zodResolver(AddCalendarSchema),
    mode: 'all',
    defaultValues: {
      name: calendar?.name,
      visibility: calendar?.visibility || CalendarVisibility.PRIVATE,
      description: calendar?.description
    }
  });

  const { mutate: addMutate, isPending: isAddPending } = useMutation({
    mutationFn: CalendarService.create,
    onSuccess: () => {
      onSubmitCb?.();
      toast.success('Calendar added');
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDARS]
      });
    }
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: CalendarService.update,
    onSuccess: () => {
      toast.success('Calendar updated');
      onSubmitCb?.();
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDARS]
      });
    }
  });

  const onSubmit = (data: AddCalendarDto) => {
    if (action === 'add') {
      addMutate(data);
    } else {
      if (!calendar) return;

      updateMutate({ id: calendar?.id, ...data });
    }
  };

  const isLoading = isAddPending || isUpdatePending;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register('name')}
            id="name"
            placeholder="Super Calendar"
            errorMessage={errors.name?.message}
            readOnly={isReadOnly}
          />
        </div>

        <div className="grid gap-2">
          <Label>Visibility</Label>

          <Select
            onValueChange={(value) => setValue('visibility', value as CalendarVisibility)}
            defaultValue={watch('visibility')}
            disabled={isReadOnly}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CalendarVisibility).map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea {...register('description')} id="description" placeholder="..." readOnly={isReadOnly} />
        </div>

        {!isReadOnly && (
          <Button type="submit" className="w-full" disabled={!isValid || isLoading} isLoading={isLoading}>
            {action === 'add' ? 'Add Calendar' : 'Update Calendar'}
          </Button>
        )}
      </div>
    </form>
  );
};
