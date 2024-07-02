"use client"
import { deleteTodoAction } from "@/actions/todo.actions"
import { ITodo } from "@/interfaces"
import { LoaderCircle, Trash } from "lucide-react"
import { useState } from "react"
import TodoDialog from "./TodoDialog"
import { Button } from "./ui/button"

interface IProps {
  todo: ITodo
  userId: string | null
}

const TodoTableActions = ({ todo, userId }: IProps) => {

  const [isLoading, setIsLoading] = useState(false)
  return <>
    <TodoDialog {...{ todo, userId }} />
    <Button onClick={async () => {
      setIsLoading(true)
      await deleteTodoAction({ id: todo?.id as string })
      setIsLoading(false)
    }} size={"icon"} variant={"destructive"} >
      {isLoading ? <LoaderCircle className="animate-spin" size={16} /> : <Trash size={16} />}
    </Button>
  </>
}

export default TodoTableActions