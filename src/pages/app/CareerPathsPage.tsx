
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CareerPathsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Career Paths</h1>
        <p className="text-muted-foreground">
          Visualize and plan your professional career progression.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placeholder: Career Path Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/50">
            <p className="text-muted-foreground">
              Interactive career path visualization will be implemented here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
