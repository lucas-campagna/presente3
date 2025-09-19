import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  name: z.string().nonempty().default(""),
  active: z.boolean().default(true).optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export type ClassFormProps = {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
};

const NameSujestions = ["História II", "Matemática", "Maternal 3", "Português"];
const getPlaceholder = () =>
  NameSujestions[Math.floor(NameSujestions.length * Math.random())];

const ClassForm: React.FC<ClassFormProps> = ({
  onSubmit,
  defaultValues = { name: "", active: true },
}) => {
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
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 p-2">
              <FormLabel>Ativa</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
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

export default ClassForm;
