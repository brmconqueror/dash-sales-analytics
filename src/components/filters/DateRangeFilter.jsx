import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DateRangeFilter({ onDateChange, placeholder = "Tarih aralığı seçin" }) {
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const handleDateSelect = (range) => {
    setDateRange(range);
    onDateChange(range);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left fw-normal border-primary",
            !dateRange.from && "text-muted"
          )}
          style={{
            width: '280px',
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--primary)/0.3)',
            transition: 'var(--transition-smooth)'
          }}
        >
          <CalendarIcon className="me-2" style={{width: '1rem', height: '1rem'}} />
          {dateRange.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "dd MMM y", { locale: tr })} -{" "}
                {format(dateRange.to, "dd MMM y", { locale: tr })}
              </>
            ) : (
              format(dateRange.from, "dd MMM y", { locale: tr })
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-0 shadow-lg" align="start" style={{
        background: 'hsl(var(--card))',
        borderRadius: '0.75rem'
      }}>
        <CalendarComponent
          initialFocus
          mode="range"
          defaultMonth={dateRange.from}
          selected={dateRange}
          onSelect={handleDateSelect}
          numberOfMonths={2}
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
}