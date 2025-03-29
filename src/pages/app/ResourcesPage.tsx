
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
        <p className="text-muted-foreground">
          Access personalized educational content to enhance your skills.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placeholder: Learning Resources Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/50">
            <p className="text-muted-foreground">
              Personalized learning resources will be displayed here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
