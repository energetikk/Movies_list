'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaKeyword } from "@/lib/zod";
 
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
 

const SearchForm = () => {

    const form = useForm({
        resolver: zodResolver(formSchemaKeyword),
        defaultValues: {
          keyword: "",
        },
      })

async function onSubmit(values: z.infer<typeof formSchemaKeyword>) {
    console.log(values)
  }
    
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex items-center">
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="введите ключевое слово.." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="">Submit</Button>
      </form>
    </Form>
  )
}

export default SearchForm;


