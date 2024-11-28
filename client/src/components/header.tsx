import ConnectedBadge from "./connected-badge";
import { ModeToggle } from "./mode-toggle";
export default function Header() {
  return (
    <div className="flex items-center justify-between w-full py-4 my-auto">
      <div>
        <h1 className="text-4xl font-bold">Connect Four | Minimax Algorithm</h1>
        <div className="mt-2">
          <span className="mr-2 font-semibold">Made by Ahmed & Mahdi</span>
          <ConnectedBadge />
        </div>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
