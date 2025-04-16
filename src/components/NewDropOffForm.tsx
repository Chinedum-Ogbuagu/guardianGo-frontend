/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDashboardContext } from "./dashboard-context";

export function NewDropOffForm() {
  const { setActiveSession } = useDashboardContext();
  const [phone, setPhone] = useState("");
  const [guardian, setGuardian] = useState("");
  const [children, setChildren] = useState([
    { name: "", className: "", hasBag: false, note: "" },
  ]);

  const handleAddChild = () => {
    setChildren([
      ...children,
      { name: "", className: "", hasBag: false, note: "" },
    ]);
  };

  const handleChange = (index: number, key: string, value: any) => {
    const updated = [...children];
    updated[index][key] = value;
    setChildren(updated);
  };

  const handleSubmit = async () => {
    console.log({
      phone,
      guardian,
      children,
    });

    // TODO: Send to backend
    setActiveSession(null);
    alert("Drop-off created (simulated)");
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">New Drop-Off</h2>

      <Input
        placeholder="Guardian phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Input
        placeholder="Guardian name"
        value={guardian}
        onChange={(e) => setGuardian(e.target.value)}
      />

      <div className="space-y-2">
        {children.map((child, index) => (
          <div key={index} className="border p-3 rounded space-y-2">
            <Input
              placeholder="Child name"
              value={child.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Class"
              value={child.className}
              onChange={(e) => handleChange(index, "className", e.target.value)}
            />
            <Input
              placeholder="Note (optional)"
              value={child.note}
              onChange={(e) => handleChange(index, "note", e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={child.hasBag}
                onChange={(e) =>
                  handleChange(index, "hasBag", e.target.checked)
                }
              />
              Has Bag
            </label>
          </div>
        ))}

        <Button variant="outline" onClick={handleAddChild}>
          + Add Child
        </Button>
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Submit Drop-Off
      </Button>
    </div>
  );
}
