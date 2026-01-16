import React from "react";
import Button from "../ui/Button.jsx";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/75 p-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 px-2">
        <Button variant="outline" className="flex-1" href="tel:0000000000" icon="📞">
          Call
        </Button>
        <Button className="flex-1" href="#apply" icon="✅">
          Apply
        </Button>
        <Button variant="outline" className="flex-1" href="#book" icon="📅">
          Book
        </Button>
      </div>
    </div>
  );
}
