import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { useWallet } from '../WalletContext';

const formSchema = z.object({
  tittle: z.string({
    required_error: "Please select a coin type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().regex(/^\d*\.?\d*$/, {
    message: "Please enter a valid price.",
  }),
  amount: z.string().regex(/^\d*\.?\d*$/, {
    message: "Please enter a valid amount.",
  }),
});

// Sample data - replace with your actual data fetching logic
const sampleAds = [
  {
    id: "1",
    tittle: "btc",
    description: "Selling BTC at market rate",
    price: "45000",
    amount: "0.5",
    status: "active",
    createdAt: "2024-01-31",
  },
  {
    id: "2",
    tittle: "eth",
    description: "ETH available for instant transfer",
    price: "2500",
    amount: "2",
    status: "inactive",
    createdAt: "2024-01-30",
  },
];

const AdDashboard = () => {
  const [ads, setAds] = useState(sampleAds);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {newAuthActor} = useWallet();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: selectedAd || {
      tittle: "",
      description: "",
      price: "",
      amount: "",
    },
  });

  const onSubmit = async (values) => {
    if (selectedAd) {
      // Update existing ad
      setAds(ads.map((ad) => (ad.id === selectedAd.id ? { ...ad, ...values } : ad)));
    } else {
      // Create new ad
      const Ad = {
        title: values.tittle,
        description: values.description,
        amount: Number(values.amount),
        price: Number(values.price),
      };
      console.log("Sending Ad to createAd function:", Ad);
      try{
        const newAd = await newAuthActor.createAd(Ad)
        console.log('ad created sucessfully',Ad);
        setAds([...ads, newAd]);
      } catch(error) {
        console.log(error);
      }
      console.log(values);
    }
    setIsDialogOpen(false);
    setSelectedAd(null);
    form.reset();
  };
  

  function handleEdit(ad) {
    setSelectedAd(ad);
    form.reset(ad);
    setIsDialogOpen(true);
  }

  function handleDelete(id) {
    setAds(ads.filter((ad) => ad.id !== id));
  }

  function handleCreateNew() {
    setSelectedAd(null);
    form.reset({
      tittle: "",
      description: "",
      price: "",
      amount: "",
    });
    setIsDialogOpen(true);
  }

  const tittleLabels = {
    btc: "Bitcoin (BTC)",
    eth: "Ethereum (ETH)",
    usdt: "Tether (USDT)",
    icp: "Internet Computer (ICP)",
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8">
      <Card className="mx-auto max-w-6xl bg-zinc-900 text-white border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-emerald-400">Ad Dashboard</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreateNew} className="bg-emerald-500 hover:bg-emerald-600">
                <Plus className="mr-2 h-4 w-4" />
                Create New Ad
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white border-zinc-800" aria-describedby="dialog-description">
              <DialogHeader>
                <DialogTitle className="text-emerald-400">{selectedAd ? "Update Ad" : "Create New Ad"}</DialogTitle>
              </DialogHeader>
              {/* Add a description for the dialog */}
              <p id="dialog-description" className="sr-only">
                {selectedAd ? "Update an existing advertisement" : "Create a new advertisement"}
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tittle"
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
                      name="price"
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
                      name="amount"
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
                    {selectedAd ? "Update Ad" : "Create Ad"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-400">Coin</TableHead>
                <TableHead className="text-zinc-400">Description</TableHead>
                <TableHead className="text-zinc-400">Price (USD)</TableHead>
                <TableHead className="text-zinc-400">Amount</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400">Created</TableHead>
                <TableHead className="text-zinc-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id} className="border-zinc-800">
                  <TableCell className="text-white">{tittleLabels[ad.tittle]}</TableCell>
                  <TableCell className="text-white">{ad.description}</TableCell>
                  <TableCell className="text-white">${ad.price}</TableCell>
                  <TableCell className="text-white">{ad.amount}</TableCell>
                  <TableCell>
                    <Badge
                      className={ad.status === "active" ? "bg-emerald-500" : "bg-zinc-700"}
                    >
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">{ad.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        className="p-2 text-zinc-400 hover:text-white"
                        onClick={() => handleEdit(ad)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(ad.id)}
                        className="text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdDashboard;