export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "").slice(0, 11);
  const part1 = digits.slice(0, 4);
  const part2 = digits.slice(4, 7);
  const part3 = digits.slice(7, 11);
  return [part1, part2, part3].filter(Boolean).join(" ");
}
