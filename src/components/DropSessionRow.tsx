export function DropSessionRow({
  session,
  onClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  onClick: () => void;
}) {
  const badge = {
    awaiting: "bg-yellow-100 text-yellow-800",
    picked_up: "bg-green-100 text-green-800",
  };

  return (
    <tr onClick={onClick} className="cursor-pointer hover:bg-muted transition">
      <td className="p-2 font-medium">{session.code}</td>
      <td>{session.guardianName}</td>
      <td>{session.phone}</td>
      <td>{session.childCount}</td>
      <td>
        <span className={`px-2 py-1 text-xs rounded ${badge[session.status]}`}>
          {session.status === "awaiting" ? "Awaiting Pickup" : "Picked Up"}
        </span>
      </td>
      <td>{new Date(session.createdAt).toLocaleTimeString()}</td>
    </tr>
  );
}
