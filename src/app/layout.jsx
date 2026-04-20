import "../styles.css";

export const metadata = {
  title: "Souvik Banerjee",
  description: "Personal website of Souvik Banerjee.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
