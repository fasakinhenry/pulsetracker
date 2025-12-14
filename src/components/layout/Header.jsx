import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800">
      <h1 className="text-lg font-semibold text-blue-400">
        PULSETRACKERS
      </h1>

      <div className="text-sm text-gray-300">
        {user?.name}
      </div>
    </header>
  );
}
