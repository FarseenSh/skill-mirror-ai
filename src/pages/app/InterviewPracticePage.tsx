
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InterviewPracticePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Practice</h1>
        <p className="text-muted-foreground">
          Prepare for job interviews with AI-powered practice sessions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placeholder: Interview Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/50">
            <p className="text-muted-foreground">
              AI-powered interview practice interface will be implemented here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
