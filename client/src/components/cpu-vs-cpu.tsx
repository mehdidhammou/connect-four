// VsCpu.js
import { heuristicMap } from "@/lib/consts";
import { Heuristic, HeuristicName } from "@/lib/types";
import { restart } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AutoBoard from "./auto-board";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const CpuVsCpu = () => {
  const [selectedStarter, setSelectedStarter] = useState<HeuristicName>();
  const [dialogOpen, setDialogOpen] = useState(!selectedStarter);

  const toggleTurn = () => {
    setSelectedStarter((prev) =>
      prev === "MM Pieces" ? "MM Positions" : "MM Pieces"
    );
  };

  return (
    <div className="w-full row-span-3">
      <Card>
        <CardHeader>
          <div className="grid grid-cols-4">
            <Button asChild variant={"ghost"} className="mr-2" size={"icon"}>
              <Link to={"/"}>
                <ArrowLeft />
              </Link>
            </Button>

            <Dialog open={dialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Who starts first?</DialogTitle>
                </DialogHeader>
                <ToggleGroup
                  variant={"outline"}
                  value={selectedStarter}
                  onValueChange={(value: HeuristicName) =>
                    setSelectedStarter(value)
                  }
                  type="single"
                  size={"lg"}
                  className="grid grid-cols-2"
                >
                  {Object.values(heuristicMap).map((heuristicName) => (
                    <ToggleGroupItem key={heuristicName} value={heuristicName}>
                      {heuristicName}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <Separator />
                <DialogFooter>
                  <div className="flex flex-col w-full gap-2">
                    <DialogClose
                      onClick={() => setDialogOpen(false)}
                      asChild
                      disabled={!selectedStarter}
                    >
                      <Button>Start</Button>
                    </DialogClose>
                    <Button asChild variant={"outline"}>
                      <Link to={"/"}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {"Main menu"}
                      </Link>
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="grid col-span-2 place-items-center">
              <h3 className="text-xl font-semibold">
                {selectedStarter}'s turn
              </h3>
            </div>

            <div className="flex">
              <Button
                className="ml-auto"
                variant={"destructive"}
                onClick={restart}
              >
                Restart
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-6">
          {!dialogOpen && (
            <AutoBoard
              toggleTurn={toggleTurn}
              starter={
                Object.keys(heuristicMap).find(
                  // @ts-expect-error ignore
                  (key) => heuristicMap[key] === selectedStarter
                ) as unknown as Heuristic
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CpuVsCpu;
