"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { register } from "@/actions/register"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import Loading from "../global/loading"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

interface AuthFormProps {
  onSuccess: () => void
  defaultTab?: "login" | "register"
}

export function AuthForm({ onSuccess, defaultTab = "login" }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const errorUrl =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email déjà utilisé avec un autre fournisseur"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  })

  const onSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      if (defaultTab === "register") {
        setError("");
        setSuccess("");

        startTransition(() => {
          register(values).then((data) => {
            setError(data.error);
            setSuccess(data.success);
          });
        });
      }
      setError("");
      setSuccess("");

      startTransition(() => {
        login(values, callbackUrl)
          .then((data) => {
            if (data?.error) {
              // form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
            }

            if (data?.twoFactor) {
              setShowTwoFactor(true);
            }
          })
          .catch(() => setError("Une erreur s'est produite !"));
      });

      onSuccess()
      toast({
        title: "Success",
        description: `You have been successfully ${defaultTab === "login" ? "logged in" : "registered"}.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code de vérification</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                            type="email"
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
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="********"
                            type="password"
                          />
                        </FormControl>
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal flex justify-end"
                        >
                          <Link href="/auth/reset">Mot de passe oublié ?</Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error || errorUrl} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? <Loading /> : showTwoFactor ? "Confirmer" : "Connexion"}
            </Button>

          </form>
        </Form>
      </TabsContent>

      <TabsContent value="register">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
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
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loading /> : "Créer un compte"}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}