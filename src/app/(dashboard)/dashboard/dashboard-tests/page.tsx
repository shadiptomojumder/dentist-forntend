"use client"
import React, { useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const TestsPage = () => {
    const [selected, setSelected] = useState<Date>();
    console.log("The date selected is:" +selected);

    const [date, setDate] = React.useState<Date>()
    console.log("The date shadecn selected is:" +date);
    return (
        <div>
            <h2>Tests Page</h2>
          
            
            <DayPicker mode="single" selected={selected} onSelect={setSelected} />
            <br />
            <br />
            <br />
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
           
        </div>
    );
};

export default TestsPage;