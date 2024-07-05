import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";

export default async function NavBar() {
  return (
    <div className="container sticky top-0 z-50 flex h-14 items-center justify-between overflow-hidden border-b bg-white p-4">
      <div className="text-xl">
        <Button variant={"outline"} className="px-2"><ArrowLeftIcon/></Button>
      </div>
      <div className="mx-auto">2/3</div>

      <div className="flex items-center space-x-4">
            <Button>Next</Button>

        </div>
    </div>
  );
}
