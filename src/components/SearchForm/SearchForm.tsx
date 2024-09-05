import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
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
 
const wordSchema = z.object({
    keyword: z.string().min(2, {
    message: "Keywords must be at least 2 characters.",
  }),
})


const SearchForm = () => {
// export function SearchForm() {

    
    const form = useForm({
        resolver: zodResolver(wordSchema),
        defaultValues: {
          keyword: "",
        },
      })

    function onSubmit() {
        console.log('asdasd')
      }
    
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                <p className="">
                    Введите название фильма для поиска...
                </p>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SearchForm;


