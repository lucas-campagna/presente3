import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  name: z.string().nonempty(),
});

type FormValues = z.infer<typeof FormSchema>;

export type ClassFormProps = {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
};

const NameSuggestions = ["Mateus", "Maria", "João", "Ana"];
const getPlaceholder = () =>
  NameSuggestions[Math.floor(NameSuggestions.length * Math.random())];

const StudentForm = ({
  onSubmit,
  defaultValues = { name: "" },
}: ClassFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const namePlaceholder = getPlaceholder();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 space-y-2 items-stretch"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder={namePlaceholder} {...field} />
              </FormControl>
              {/* <FormDescription>Nome da classe</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Criar</Button>
      </form>
    </Form>
  );
};

export default StudentForm;
