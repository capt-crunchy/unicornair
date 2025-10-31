import PasswordGate from "@/components/PasswordGate";

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordGate>
      {children}
    </PasswordGate>
  );
}
