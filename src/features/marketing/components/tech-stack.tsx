import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TechStack() {
  const techStack = [
    "Next.js 15",
    "Better Auth",
    "PostgreSQL",
    "Drizzle ORM",
    "Tailwind CSS",
    "shadcn ui",
    "TypeScript",
    "React Hook Form",
    "Zod",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tech Stack</CardTitle>
        <CardDescription>
          Built with modern technologies for performance, security, and developer
          experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <Badge key={index} variant="outline" className="px-3 py-1">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
