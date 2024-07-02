"use server"
import { ITodo } from '@/interfaces';

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache';

interface ICreateTodo {
  title: string
  body?: string | undefined
  completed: boolean
  userId: string | null
}

interface IUserTodo {
  userId: string | null
}

const prisma = new PrismaClient()

export const getUserTodoUserAction = async ({ userId }: IUserTodo) => {
  return await prisma.todo.findMany({
    where: {
      user_id: userId as string,
    },
    orderBy: {
      createAt: 'desc'
    }
  })
}
export const createTodoAction = async ({ title, body, completed, userId }: ICreateTodo) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      user_id: userId as string
    }
  })
  revalidatePath('/')
}
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id
    }
  })
  revalidatePath('/')
}
export const updateTodoAction = async ({ id, title, body, completed }: ITodo) => {
  await prisma.todo.update({
    where: {
      id
    },
    data: {
      title,
      body,
      completed
    }
  })
  revalidatePath('/')
}