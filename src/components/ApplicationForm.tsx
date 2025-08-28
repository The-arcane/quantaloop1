"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitApplication } from "@/app/join/actions"
import { useEffect, useState } from "react"
import { Loader2, PartyPopper } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  course: z.enum(["BCA", "BBA", "MBA", "LLB", "BBA LLB"], { required_error: "Please select your course." }),
  erp: z.string().min(1, { message: "ERP is required." }),
  sem_and_year: z.string().min(1, { message: "Please enter your Semester and Year." }),
  contact_number: z.string().min(10, { message: "Please enter a valid contact number." }),
  reason_to_join: z.string().min(10, { message: "Please tell us why you want to join." }).max(1000, { message: "Your reason should not exceed 200 words." }),
  top_skills: z.string().min(2, { message: "Please list your top skills." }).max(250, { message: "Please keep it within 50 words." }),
  hackathon_participation: z.enum(["Yes", "No"], { required_error: "Please select an option." }),
  role_preference: z.enum(["Builder", "Thinker", "Designer", "Hacker"], { required_error: "Please select your preference." }),
})

export function ApplicationForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      full_name: "",
      erp: "",
      sem_and_year: "",
      contact_number: "",
      reason_to_join: "",
      top_skills: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Create a new object for submission with ERP in uppercase
    const submissionValues = {
        ...values,
        erp: values.erp.toUpperCase(),
    };

    const result = await submitApplication(submissionValues);
    setIsSubmitting(false)

    if (result.success) {
      setShowSuccessDialog(true)
      form.reset()
    } else {
      toast({
        title: "Error",
        description: result.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }
  
  const fieldContainerClass = "bg-card/5 p-4 rounded-md border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300";

  return (
    <>
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center text-center">
             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                <PartyPopper className="h-6 w-6 text-primary" />
              </div>
            <AlertDialogTitle>Application Submitted!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for applying to QuantaLoop! As a next step, please join our WhatsApp group for audition updates and announcements.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <Link href="https://chat.whatsapp.com/H2YMLm1hCtQFImW1G3LIj2?mode=ac_t" target="_blank" className="w-full sm:w-auto">
                <AlertDialogAction className="w-full">Join WhatsApp Group</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className={fieldContainerClass}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="raunaq.adlakha@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={fieldContainerClass}>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Raunaq Adlakha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={fieldContainerClass}>
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row sm:flex-wrap pt-2">
                      <FormItem className="flex items-center space-x-3 space-y-0 mr-4 mb-2 sm:mb-0"><FormControl><RadioGroupItem value="BCA" /></FormControl><FormLabel className="font-normal">BCA</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 mr-4 mb-2 sm:mb-0"><FormControl><RadioGroupItem value="BBA" /></FormControl><FormLabel className="font-normal">BBA</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 mr-4 mb-2 sm:mb-0"><FormControl><RadioGroupItem value="MBA" /></FormControl><FormLabel className="font-normal">MBA</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 mr-4 mb-2 sm:mb-0"><FormControl><RadioGroupItem value="LLB" /></FormControl><FormLabel className="font-normal">LLB</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="BBA LLB" /></FormControl><FormLabel className="font-normal">BBA LLB</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
              <div className={fieldContainerClass}>
                  <FormField
                  control={form.control}
                  name="erp"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>ERP</FormLabel>
                      <FormControl>
                          <Input 
                            type="text" 
                            placeholder="Your ERP number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            className="uppercase"
                          />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
              <div className={fieldContainerClass}>
                  <FormField
                  control={form.control}
                  name="sem_and_year"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Sem & Year</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="e.g., 3rd Sem, 2nd Year" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </div>
          </div>
          <div className={fieldContainerClass}>
            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+91 1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={fieldContainerClass}>
            <FormField
              control={form.control}
              name="reason_to_join"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why Quantaloop?</FormLabel>
                  <FormDescription>What motivates you to join Quantaloop? (Max 200 words)</FormDescription>
                  <FormControl>
                    <Textarea placeholder="Tell us about your passion for technology..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={fieldContainerClass}>
            <FormField
              control={form.control}
              name="top_skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Top 3 Skills</FormLabel>
                  <FormDescription>List your top 3 hard skills in order of strength. (Max 50 words)</FormDescription>
                  <FormControl>
                    <Input type="text" placeholder="e.g., Python, React, UI Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={fieldContainerClass}>
            <FormField
              control={form.control}
              name="hackathon_participation"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Have you ever participated in any hackathon, tech event, or competition?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-6 pt-2">
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={fieldContainerClass}>
            <FormField
              control={form.control}
              name="role_preference"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Are you more of a:</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2 pt-2">
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Builder" /></FormControl><FormLabel className="font-normal">Builder (like coding & development)</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Thinker" /></FormControl><FormLabel className="font-normal">Thinker (ideas, strategies, event planning)</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Designer" /></FormControl><FormLabel className="font-normal">Designer (Canva, Capcut, visuals)</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Hacker" /></FormControl><FormLabel className="font-normal">Hacker (problem-solving, debugging, competitions)</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-secondary text-black rounded-full shadow-lg shadow-primary/40 hover:shadow-secondary/60 transition-all duration-300 hover:scale-105" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </form>
      </Form>
    </>
  )
}
