import Link from "next/link";
// mx-auto px-4 py-8 md:py-12
export function BottomBar() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mt-8 border-t pt-6 md:mt-12 md:pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            {currentYear} HireHunt
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Built by{" "}
            <Link
              href="https://jzach.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Zach Smith
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
