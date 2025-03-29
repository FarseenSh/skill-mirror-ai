
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkillsDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills Dashboard</h1>
        <p className="text-muted-foreground">
          Track and analyze your skill development progress.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placeholder: Skills Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/50">
            <p className="text-muted-foreground">
              Skill development charts and analytics will be displayed here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
