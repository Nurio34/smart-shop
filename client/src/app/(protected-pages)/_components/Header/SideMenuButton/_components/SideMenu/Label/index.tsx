function Label({ role }: { role: string }) {
  return (
    <div
      className={`text-center font-semibold rounded-md justify-self-center py-1 px-2
    ${
      role === "USER"
        ? "bg-gradient-to-r from-green-500 to-green-300"
        : role === "SELLER"
        ? "bg-gradient-to-r from-orange-500 to-orange-300"
        : "bg-gradient-to-r from-red-500 to-red-300"
    }
    `}
    >
      {role}
    </div>
  );
}
export default Label;
