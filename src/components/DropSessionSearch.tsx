import { useDashboardContext } from "./dashboard-context";
import { Input } from "@/components/ui/input";

export function DropSessionSearch({
  onChange,
}: {
  onChange: (term: string) => void;
}) {
  const { setActiveSession } = useDashboardContext();

  return (
    <div className="flex justify-between items-center mb-4">
      <Input
        placeholder="Search by phone or code..."
        className="w-2/3"
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="bg-primary text-white px-4 py-2 rounded ml-4"
        onClick={() => setActiveSession("new")}
      >
        + New Drop-Off
      </button>
    </div>
  );
}
