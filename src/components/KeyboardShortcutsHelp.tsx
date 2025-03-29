
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";

export function KeyboardShortcutsHelp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Keyboard className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Quick keyboard shortcuts to boost your productivity
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Global</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Command Palette</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">⌘K</kbd>
              </div>
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Toggle Theme</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">⌘J</kbd>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Navigation</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Dashboard</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">G D</kbd>
              </div>
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Skills</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">G S</kbd>
              </div>
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Projects</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">G P</kbd>
              </div>
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Settings</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">G ,</kbd>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Export Skills</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">⌘E S</kbd>
              </div>
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Export Portfolio</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">⌘E P</kbd>
              </div>
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">Share</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">⌘S</kbd>
              </div>
              <div className="flex items-center justify-between rounded-md border px-4 py-2">
                <span className="text-sm">New Project</span>
                <kbd className="rounded border bg-muted px-2 py-0.5 text-xs font-medium">⌘N</kbd>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
