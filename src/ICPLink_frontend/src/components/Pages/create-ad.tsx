"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  coinType: z.string({
    required_error: "Please select a coin type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  unitPrice: z.string().regex(/^\d*\.?\d*$/, {
    message: "Please enter a valid price.",
  }),
  amountForSale: z.string().regex(/^\d*\.?\d*$/, {
    message: "Please enter a valid amount.",
  }),
})

export default function CreateAd() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8">
      <Card className="mx-auto max-w-2xl bg-zinc-900 text-white border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-emerald-400">Create New Ad</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="coinType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Coin Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select a coin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="icp">Internet Computer (ICP)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your offer..."
                        className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-400">
                      Include payment methods and any specific requirements.
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="unitPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Unit Price (USD)</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" className="bg-zinc-800 border-zinc-700 text-white" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amountForSale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Amount for Sale</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" className="bg-zinc-800 border-zinc-700 text-white" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                Create Ad
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

