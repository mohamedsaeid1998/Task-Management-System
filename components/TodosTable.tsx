"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ITodo } from "@/interfaces"
import { AnimatePresence, motion } from 'framer-motion'
import moment from "moment"
import { useState } from "react"
import TodoTableActions from "./TodoTableActions"
import { Badge } from "./ui/badge"

interface IProps {
  todos: ITodo[]
  userId: string | null
}

export default function TodosTable({ todos, userId }: IProps) {
  const [filter, setFilter] = useState<string>("all")

  const filteredTodos = todos.filter((todo: ITodo) => {
    if (filter === "all") return todo
    if (filter === "completed") return todo.completed
    if (filter === "uncompleted") return !todo.completed
  })
  const MotionRow = motion(TableRow)
  return <>

    <div className="mb-3">
      <Select onValueChange={setFilter} >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed Task</SelectItem>
            <SelectItem value="uncompleted">Uncompleted Task</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <Table>
      <TableCaption>A list of your recent Todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] hidden md:table-cell">ID</TableHead>
          <TableHead>TITLE</TableHead>
          <TableHead>COMPLETED</TableHead>
          <TableHead className="hidden sm:table-cell " >CREATED AT</TableHead>
          <TableHead className="text-right">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence initial={false} >
          {filteredTodos?.map((todo: ITodo) => (
            <MotionRow
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ layout: { type: "spring" } }}
              layout
              key={todo?.id}>
              <TableCell className="font-medium hidden md:table-cell">{todo?.id}</TableCell>
              <TableCell>{todo?.title}</TableCell>
              <TableCell>
                {todo?.completed ? (
                  <Badge className="bg-green-500">Completed</Badge>
                ) : (
                  <Badge variant={"secondary"}>Uncompleted</Badge>
                )}
              </TableCell>
              <TableCell className=" hidden sm:table-cell"><span>{moment(todo?.createAt).format("Do MMM YY ")}</span> | <span> {moment(todo?.createAt).format("HH:mmA")}</span></TableCell>
              <TableCell className="flex justify-end items-center space-x-2">
                <TodoTableActions {...{ todo, userId }} />
              </TableCell>
            </MotionRow>
          ))}
        </AnimatePresence>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {!filteredTodos?.length ? "You Don't have Any Todos Yet" : filteredTodos?.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>

  </>
}