
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects Board</h1>
        <p className="text-muted-foreground">
          Manage your work assignments and track project progress.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placeholder: Projects Kanban Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/50">
            <p className="text-muted-foreground">
              Project management kanban board will be implemented here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
