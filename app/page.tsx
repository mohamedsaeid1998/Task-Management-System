import { getUserTodoUserAction } from "@/actions/todo.actions"
import TodoDialog from "@/components/TodoDialog"
import TodosTable from "@/components/TodosTable"
import { auth } from "@clerk/nextjs/server"


export default async function Home() {
  const { userId } = auth()
  const todos = await getUserTodoUserAction({ userId })
  return <>

    <TodoDialog operation="Add" {...{ userId }} />
    <TodosTable {...{ todos, userId }} />
  </>
}