// VsCpu.js
import { Player } from "@/lib/types";
import { restart } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Board from "./board";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type VsCpuProps = {
  whichCpu: 1 | 2;
};

const VsCpu = ({ whichCpu }: VsCpuProps) => {
  const [selectedStarter, setSelectedStarter] = useState<Player>();

  const [currentPlayer, setCurrentPlayer] = useState<Player>();

  const handleStartClick = () => {
    setCurrentPlayer(selectedStarter);
  };

  const toggleTurn = () => {
    setCurrentPlayer((currentPlayer) =>
      currentPlayer === "CPU" ? "Human" : "CPU"
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

            <Dialog open={!currentPlayer}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Who starts first?</DialogTitle>
                </DialogHeader>
                <ToggleGroup
                  variant={"outline"}
                  value={selectedStarter}
                  onValueChange={(value: Player) => setSelectedStarter(value)}
                  type="single"
                  size={"lg"}
                  className="grid grid-cols-2"
                >
                  <ToggleGroupItem variant={"outline"} value="Human">
                    Human
                  </ToggleGroupItem>
                  <ToggleGroupItem variant={"outline"} value="CPU">
                    CPU
                  </ToggleGroupItem>
                </ToggleGroup>
                <Separator />
                <DialogFooter>
                  <div className="flex flex-col w-full gap-2">
                    <Button
                      disabled={!selectedStarter}
                      onClick={handleStartClick}
                    >
                      Start
                    </Button>
                    <Button asChild variant={'outline'}>
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
              <h3 className="text-xl font-semibold">{currentPlayer}'s turn</h3>
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
          {currentPlayer && (
            <Board
              toggleTurn={toggleTurn}
              selectedStarter={selectedStarter}
              whichCpu={whichCpu}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VsCpu;
