import { Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { dashboardConfig } from "@/features/dashboard/config/dashboard-config";

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {dashboardConfig.quickActions.title}
          </CardTitle>
          <CardDescription>
            {dashboardConfig.quickActions.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardConfig.quickActions.items.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-auto p-4 flex-col gap-2"
                asChild
              >
                <Link
                  href={action.href}
                  {...(action.external ? { target: "_blank" } : {})}
                >
                  <action.icon className="h-5 w-5" />
                  <span>{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>{dashboardConfig.techStack.title}</CardTitle>
          <CardDescription>
            {dashboardConfig.techStack.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {dashboardConfig.techStack.items.map((tech) => (
              <Badge key={tech} variant="outline" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
