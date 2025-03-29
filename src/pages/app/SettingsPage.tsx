import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Monitor, Moon, Sun } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and application settings.
        </p>
      </div>

      <Card className="overflow-hidden border-border transition-colors duration-300">
        <CardHeader className="bg-muted/40">
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <Label className="text-base">Theme Preference</Label>
            <RadioGroup 
              value={theme} 
              onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>Light</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                  <Moon className="h-4 w-4 text-indigo-400" />
                  <span>Dark</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                  <Monitor className="h-4 w-4" />
                  <span>System</span>
                </Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground">
              Choose how SkillMirror appears to you. Select a theme or sync with your system settings.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Label className="text-base">Interface Settings</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reduce-motion" className="cursor-pointer">Reduce motion</Label>
                <Switch id="reduce-motion" />
              </div>
              <p className="text-sm text-muted-foreground">
                Minimize animations throughout the interface.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="cursor-pointer">High contrast mode</Label>
                <Switch id="high-contrast" />
              </div>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better readability.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-border transition-colors duration-300">
        <CardHeader className="bg-muted/40">
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <Label className="text-base">Notifications</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="cursor-pointer">Email Notifications</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Receive updates about your progress and new opportunities.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="browser-notifications" className="cursor-pointer">Browser Notifications</Label>
                <Switch id="browser-notifications" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Get real-time alerts about your projects and feedback.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Label className="text-base">Privacy</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="data-collection" className="cursor-pointer">Data Collection</Label>
                <Switch id="data-collection" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Allow us to collect anonymized usage data to improve the platform.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="share-progress" className="cursor-pointer">Share Progress with Employers</Label>
                <Switch id="share-progress" />
              </div>
              <p className="text-sm text-muted-foreground">
                Make your skill progress visible to potential employers.
              </p>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </div>
          
          <Separator className="my-2" />
          
          <div className="pt-2">
            <Button variant="destructive" size="sm">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
