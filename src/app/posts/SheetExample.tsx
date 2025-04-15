"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";
const isSheetOpen = signal(false);

const SheetExample = () => {
  useSignals();

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          console.log("Open Sheet button clicked");
          isSheetOpen.value = true;
          console.log(
            "Sheet open state after button click:",
            isSheetOpen.value
          );
        }}
      >
        Open Sheet
      </Button>

      <Sheet
        open={isSheetOpen.value}
        onOpenChange={(value) => {
          console.log("Sheet open state changed via onOpenChange:", value);
          isSheetOpen.value = value;
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetExample;
