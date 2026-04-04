import Link from "next/link";

export function Footer() {
  return (
    <div className="text-center mt-12 pt-8 border-t border-border/50">
      <p className="text-sm text-muted-foreground w-full flex align-center">
        Built with ❤️ by{" "}
        <Link
          className="text-primary mx-1"
          href="https://goodshepherdinsights.com"
          target="_blank"
        >
          Good Shepherd Insights
        </Link>
      </p>
    </div>
  );
}
