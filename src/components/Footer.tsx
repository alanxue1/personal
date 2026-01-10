export default function Footer() {
  return (
    <footer className="w-full py-8">
      <div className="container mx-auto px-4">
        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} © Alan Xue
        </p>
      </div>
    </footer>
  );
}