import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const submit = useSubmit();
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };
  //   const errorMessage = actionData?.error || null;
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function onSubmit(values: z.infer<typeof formSchema>) {
    // pass the form data to the action function
    submit(values, {
      method: "POST",
      action: "register/otp",
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
            <span className="sr-only">Furniture Shop.</span>
          </Link>
          <h1 className="mb-8 text-xl font-bold">
            We have sent OTP to your phone
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {actionData && (
                <p className="text-red-400">{actionData?.message}</p>
              )}
              <Button type="submit" className="w-full">
                {isSubmitting ? "Submitting..." : "Verify OTP"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
