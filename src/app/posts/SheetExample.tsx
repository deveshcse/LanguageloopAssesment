"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";

const SheetExample = () => {
  const isSheetOpen = useSignal(false);

  useEffect(() => {
    console.log("Sheet open state changed:", isSheetOpen.value);
  }, [isSheetOpen.value]); // This will trigger a log whenever the value changes


  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          console.log("Open Sheet button clicked", isSheetOpen.value);
          isSheetOpen.value = true;
        }}
      >
        Open Sheet
      </Button>
      <Sheet
        open={isSheetOpen.value}
        onOpenChange={(value) => {
          console.log("Sheet open state changed:", value);
          isSheetOpen.value = value;
        }}
      >
        <SheetContent>
          <SheetClose
            onClick={() => {
              console.log("Close button clicked inside Sheet");
              isSheetOpen.value = false;
            }}
          >
            Close
          </SheetClose>

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
