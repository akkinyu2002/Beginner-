import './globals.css';

export const metadata = {
  title: 'CodeFromZero',
  description: 'Learn coding from zero with simple and advanced modes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
