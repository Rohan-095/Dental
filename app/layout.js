import "./globals.css";

export const metadata = {
  title: "Ava Dental Studio - Premium AI-Powered Dental Care",
  description:
    "Book your appointment 24/7 with Ava, the AI receptionist for modern dental care in Vancouver.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
