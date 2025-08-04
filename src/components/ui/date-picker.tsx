'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button, Calendar, Label, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

export function DatePicker({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: Date | undefined) => void;
  value: Date | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);
  const id = React.useId();

  React.useEffect(() => {
    onChange(date);
  }, [date]);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id} className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id={id} className="w-48 justify-between font-normal">
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={date => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
