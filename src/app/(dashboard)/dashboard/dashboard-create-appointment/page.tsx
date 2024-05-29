"use client";
import Appointment from "@/api/appointment/appointment";
import Spinner from "@/app/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { addDays, format, isAfter, isBefore, startOfToday } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";



const formSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your full name")
    .min(3, "Fullname must be at least 3 characters")
    .max(20, "Fullname cannot exceed 20 characters"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(1, "Please enter your phone number")
    .refine((phone) => /^01[3-9]\d{8}$/.test(phone), {
      message: "Please enter a valid phone number",
    }),
  address: z.optional(z.string()),
  service: z
    .string()
    .min(1, "Please enter your desire service")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
  appointmentDate: z.date({ required_error: "Please select an appointment date" }),
  appointmentTime: z.coerce
    .string()
    .min(1, "Please enter your time slot"),
  status: z.string().min(1, "Please enter payment status"),  
  message: z.optional(z.string()),
});

type FormData = z.infer<typeof formSchema>;

const DashboardCreateAppointment = () => {
    const router = useRouter();
    const [date, setDate] = useState<Date>();
    //   console.log("The date is", date);

    // date modal close on date select
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    //   const handleDateSelect: SelectSingleEventHandler = (day) => {
    //     setDate(day);
    //     setIsPopoverOpen(false); // Close the popover when a date is selected
    //   };

    // Disable past dates and dates beyond the next 4 days
    const today = startOfToday();
    const maxDate = addDays(today, 6);

    const customDisabledDays = (date: any) => {
        return isBefore(date, today) || isAfter(date, maxDate);
    };

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(formSchema) });

    const { mutate , isPending } = useMutation({
        mutationFn: Appointment,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Appointment successfully registered");
            reset();
            }
        },
        onError: (error:any) => {
            console.log("The Error Appointment is:", error);
            if (error?.response?.status == 409) {
                toast.warning("There is already an appointment with this name and date.")
        
              } else if (error?.response?.status == 500) {
                toast.error("Something went wrong during an appointment")
              } else if (error.request) {
                toast.error("No response received from the server!!")
              } else {
                console.error("Error while sending the request:", error.message);
              }

        }
    })

    const onSubmit: SubmitHandler<FormData> = async (data: any) => {
        const dateString = format(data.appointmentDate, "dd MMMM yyyy")
        const updateDate = {
            ...data,
            appointmentDate: dateString,
        }
        await mutate(updateDate);
    };

  return (
    <main className="bg-[#040D12] px-10">
        <div className="mx-auto space-y-6 bg-[#040D12]">
            <div className="space-y-2 text-center">
            <h1 className="text-3xl text-gray-200 font-bold">
                Create An Appointment For Patient
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
                Fill out the form below to create an appointment.
            </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">Name <span className="text-red-500">*</span></Label>
                    <Input
                        id="name"
                        placeholder="Enter your name"
                        className="focus:border-primary h-11"
                        {...register("name")}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">
                        {errors.name.message}
                        </span>
                    )}
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">Phone Number <span className="text-red-500">*</span></Label>
                    <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        type="tel"
                        className="focus:border-primary h-11"
                        {...register("phone")}
                    />
                    {errors.phone && (
                        <span className="text-red-500 text-sm">
                        {errors.phone.message}
                        </span>
                    )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address" className="text-base">Address (optional)</Label>
                    <Textarea
                    id="address"
                    placeholder="Enter your address"
                    className="focus:border-primary"
                    {...register("address")}
                    />
                    {errors.address && (
                    <span className="text-red-500 text-sm">
                        {errors.address.message}
                    </span>
                    )}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="service" className="text-base">Service <span className="text-red-500">*</span></Label>
                    <Controller
                    name="service"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                        <SelectTrigger className="focus:border-primary h-11">
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                            <SelectItem value="filling">Fillings</SelectItem>
                            <SelectItem value="extraction">Tooth Extraction</SelectItem>
                            <SelectItem value="whitening">Teeth Whitening</SelectItem>
                            <SelectItem value="root-canal">Root Canal</SelectItem>
                        </SelectContent>
                        </Select>
                    )}
                    />
                    {errors.service && (
                    <span className="text-red-500 text-sm">
                        {errors.service.message}
                    </span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="appointmentDate" className="text-base">
                    Appointment Date <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                    name="appointmentDate"
                    control={control}
                    defaultValue={date}
                    render={({ field }) => (
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger asChild className="h-11">
                            <Button
                            variant={"outline"}
                            className={cn(
                                "justify-start text-left font-normal w-full bg-transparent",
                                !date && "text-muted-foreground"
                            )}
                            onClick={() => setIsPopoverOpen((open) => !open)}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto p-0 bg-transparent border-none rounded-xl"
                            align="start"
                        >
                            <Calendar
                            className="bg-[#040D12] rounded-xl"
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                field.onChange(selectedDate);
                                setIsPopoverOpen(false);
                            }}
                            initialFocus
                            disabled={[
                                { dayOfWeek: [5, 6] }, // Disable Sundays (0) and Saturdays (6)
                                customDisabledDays, // Custom logic for disabling past and future dates
                            ]}
                            />
                        </PopoverContent>
                        </Popover>
                    )}
                    />
                    {errors.appointmentDate && (
                    <span className="text-red-500 text-sm">
                        {errors.appointmentDate.message}
                    </span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="appointmentTime" className="text-base">Appointment Time</Label>
                    <Controller
                    name="appointmentTime"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                            <SelectTrigger className="focus:ring-0 h-11">
                                <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="9:00 AM to 10:00 AM">9:00 AM to 10:00 AM</SelectItem>
                                <SelectItem value="10:00 AM to 11:00 AM">10:00 AM to 11:00 AM</SelectItem>
                                <SelectItem value="11:00 AM to 12:00 PM">11:00 AM to 12:00 PM</SelectItem>
                                <SelectItem value="12:00 PM to 1:00 PM">12:00 PM to 1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM to 3:00 PM">2:00 PM to 3:00 PM</SelectItem>
                                <SelectItem value="3:00 PM to 4:00 PM">3:00 PM to 4:00 PM</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                    />
                    {errors.appointmentTime && (
                    <span className="text-red-500 text-sm">
                        {errors.appointmentTime.message}
                    </span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">Message (optional)</Label>
                    <Textarea
                    id="message"
                    placeholder="Enter any additional information.."
                    className="p-2 focus:border-primary"
                    {...register("message")}
                    />
                    {errors.message && (
                    <span className="text-red-500 text-sm">
                        {errors.message.message}
                    </span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">Payment Status <span className="text-red-500">*</span></Label>
                    
                    <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full h-11 focus:ring-0">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="booked">Booked</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    )}/>

                    {errors.status && (
                    <span className="text-red-500 text-sm">
                        {errors.status.message}
                    </span>
                    )}
                </div>

                <Button
                className="w-full hover:bg-primary gap-2 justify-center font-bold text-black"
                type="submit"
                disabled={isPending}
                >
                {isPending ? <><Spinner /> Create Appointment</> : "Create Appointment"}
                </Button>
            </form>
        </div>
    </main>
  );
};

export default DashboardCreateAppointment;
