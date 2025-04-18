import {
  ActionFunctionArgs,
  Link,
  redirect,
  useSubmit,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { PasswordInput } from "./Password-Input";
import { authApi } from "@/api";
import { AxiosError } from "axios";

const formSchema = z.object({
  phone: z
    .string()
    .min(7, {
      message: "Phone number is too short.",
    })
    .max(12, "Phone number is too long.")
    .regex(/^[0-9]+$/, "Phone number must be a number"),
  password: z
    .string()
    .min(8, {
      message: "Password must be 8 digits.",
    })
    .max(8, "Password must be 8 digits.")
    .regex(/^[0-9]+$/, "Password must be a number"),
});

export default function LoginForm() {
  const submit = useSubmit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // pass the form data to the action function
    submit(values, {
      method: "POST",
      action: "/login",
    });
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your phone number below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full space-y-4 pr-8 lg:pr-0"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0977**********"
                      required
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <FormControl>
                    <PasswordInput
                      id="password"
                      // type="password"
                      // placeholder="********"
                      required
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <div className="grid gap-4">
              <Button variant="outline" className="w-full">
                Sign In with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authData = {
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  try {
    const response = await authApi.post("/login", authData);
    if (response.status !== 200) {
      return { error: response.data || "Login failed" };
    }
    const redirectTo = new URL(request.url).searchParams.get("redirect") || "/"; // if there is redirect url, redirect to that page else redirect to home page
    return redirect(redirectTo);
  } catch (error) {
    console.log("Login action: ", error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Login failed";
      return { error: errorMessage };
    }
    throw error;
  }
};
