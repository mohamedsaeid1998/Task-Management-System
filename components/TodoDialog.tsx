"use client"
import { createTodoAction, updateTodoAction } from "@/actions/todo.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ITodo } from "@/interfaces";
import { TTodoFormValues, todoFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pen, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";


interface IProps {
  operation?: string
  todo?: ITodo
  userId: string | null
}

const TodoDialog = ({ todo, operation, userId }: IProps) => {

  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const defaultValues: Partial<TTodoFormValues> = {
    title: todo?.title as string,
    body: todo?.body as string,
    completed: todo?.completed
  }

  const form = useForm<TTodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  })


  const onSubmit = async ({ title, body, completed }: TTodoFormValues) => {
    setIsLoading(true)
    if (operation === "Add") {
      await createTodoAction({ title, body, completed: completed as boolean, userId })
      setIsLoading(false)
      setOpen(false)
    } else {
      await updateTodoAction({ id: todo?.id, title, body, completed: completed as boolean })
      setIsLoading(false)
      setOpen(false)
    }

  }


  return <>
    <Dialog open={open} onOpenChange={setOpen}>

      <div className={`${operation === "Add" ? "w-full  text-end" : ""}`}>
        <DialogTrigger asChild >
          <Button size={operation === "Add" ? "default" : "icon"}>
            {operation === "Add" ? <> <Plus size={14} className="mr-2" /> Add Task   </> : <Pen size={16} />}
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{operation === "Add" ? "Add New Todo" : "Edit This Todo"}</DialogTitle>
        </DialogHeader>
        <div className=" py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Go to Gym" className="truncate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can write a short description about your next todo .
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-1 ">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                    </FormControl>
                    <FormLabel>Completed</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-center">
                <Button disabled={isLoading} >{isLoading ? <><LoaderCircle className="animate-spin mr-2" size={16} /> Saving</> : "Save"}</Button>

              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  </>
}

export default TodoDialog