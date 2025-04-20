import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Link,
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "./Password-Input";
import useAuthStore, { Status } from "@/store/authStore";

const formSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be 8 digits.",
    })
    .max(8, "Password must be 8 digits."),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be 8 digits.",
    })
    .max(8, "Password must be 8 digits."),
});

export function ConfirmPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const submit = useSubmit();
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };
  // const errorMessage = actionData?.error || null;
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // pass the form data to the action function
    submit(values, {
      method: "POST",
      action: "/register/confirm-password",
    });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <Icons.logo className="size-6" />
            </div>
            <span className="sr-only">Confirm Password.</span>
          </Link>
          <h1 className="text-xl font-bold">Please confirm your password</h1>
          <div className="text-center text-sm">Password must be 8 digits.</div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full space-y-4 pr-8 lg:pr-0"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput type="password" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput type="passowrd" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {actionData && (
                  <p className="text-red-400">{actionData?.message}</p>
                )}
                <Button type="submit" className="w-full">
                  {isSubmitting ? "Submitting..." : "Confirm"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const confirmPasswordLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }
  return null;
};
