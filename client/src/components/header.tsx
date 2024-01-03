import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full py-4 my-auto">
      <div>
        <h1 className="text-4xl font-bold">Connect Four | Minimax Algorithm</h1>
        <p className="mt-2 font-semibold">Made by Ahmed & Mahdi</p>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
