import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MainNavItem } from "@/types";

interface MainNavigationProps {
  items: MainNavItem[];
}
function MobileNavigation({ items }: MainNavigationProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="ml-4 size-5">
            <span className="sr-only">Toggle Menu</span>
            <Icons.menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pt-10">
          <SheetClose asChild>
            <Link to="/" className="flex items-center space-x-4">
              <Icons.logo className="size-8" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only"></span>
            </Link>
          </SheetClose>
          <ScrollArea className="mt-8 h-[calc(100vh-8rem)] pb-8">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="{items?.[0].title}">
                <AccordionTrigger>{items?.[0].title}</AccordionTrigger>
                <AccordionContent>
                  {items[0].card?.map((item) => (
                    <SheetClose asChild key={item.title}>
                      <Link
                        key={item.title}
                        to={String(item.href)}
                        className="block px-4 py-2 text-foreground/70"
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-4 flex flex-col space-y-4">
              {items[0].menu?.map((item) => (
                <SheetClose asChild key={item.title}>
                  <Link to={String(item.href)} className="text-sm">
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavigation;
