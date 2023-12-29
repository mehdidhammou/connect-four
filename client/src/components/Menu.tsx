import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { gameModes } from "../lib/consts";
import { Separator } from "./ui/separator";

const Menu = () => {
  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Choose a game mode</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-4 p-6 md:grid-cols-3">
          {gameModes.map((mode, idx) => (
            <Button
              key={idx}
              asChild
              className="flex-col h-32"
              variant={"outline"}
            >
              <Link to={mode.link}>
                <div className="flex gap-4">
                  <mode.Icon1 className="w-6 h-6" />
                  vs
                  <mode.Icon2 className="w-6 h-6" />
                </div>
                <p className="mt-4">{mode.name}</p>
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Menu;
