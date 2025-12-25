"use client";

import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ComponentsDemo() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website UI Components</CardTitle>
              <CardDescription>
                Button, text box, card, text area, select box, and toast
                notification.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Box</label>
                <Input placeholder="Type something..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Area</label>
                <Textarea placeholder="Enter a longer message..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Box</label>
                <Select defaultValue="option1">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() => toast("This is a toast notification")}
              >
                Show Toast
              </Button>
              <Button type="button" variant="outline">
                Secondary Button
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}
