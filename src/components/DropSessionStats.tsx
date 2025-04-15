"use client";

export function DropSessionStats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-muted p-4 rounded shadow-sm">
        <p className="text-sm text-muted-foreground">Total Drop-Offs</p>
        <h3 className="text-xl font-bold">12</h3>
      </div>
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow-sm">
        <p className="text-sm">Awaiting Pickup</p>
        <h3 className="text-xl font-bold">4</h3>
      </div>
      <div className="bg-green-100 text-green-800 p-4 rounded shadow-sm">
        <p className="text-sm">Picked Up</p>
        <h3 className="text-xl font-bold">8</h3>
      </div>
    </div>
  );
}
