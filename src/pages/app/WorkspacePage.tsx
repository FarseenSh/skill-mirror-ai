
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkspacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workspace</h1>
        <p className="text-muted-foreground">
          Interact with AI colleagues on realistic tasks and scenarios.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placeholder: AI Workplace Simulation</CardTitle>
          <CardDescription>
            This section will contain interactive workplace simulations with AI colleagues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/50">
            <p className="text-muted-foreground">
              AI colleague interaction interface will be implemented here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
