
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy, Twitter, Linkedin, FacebookIcon } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  skill: string;
}

interface ShareAchievementProps {
  achievement: Achievement;
}

export function ShareAchievement({ achievement }: ShareAchievementProps) {
  const [platform, setPlatform] = useState("copy");
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();
  
  const shareUrl = `https://skillmirror.app/share/achievement/${achievement.id}`;
  
  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      switch (platform) {
        case "copy":
          await navigator.clipboard.writeText(shareUrl);
          toast({
            title: "Link copied!",
            description: "Achievement link has been copied to clipboard.",
          });
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`I achieved "${achievement.title}" in ${achievement.skill}! Check out my progress on SkillMirror:`)}`,
            "_blank"
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            "_blank"
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            "_blank"
          );
          break;
      }
    } catch (error) {
      toast({
        title: "Sharing failed",
        description: "There was an error sharing your achievement.",
        variant: "destructive",
      });
      console.error("Error sharing achievement:", error);
    } finally {
      setIsSharing(false);
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Achievement</DialogTitle>
          <DialogDescription>
            Share your achievement "{achievement.title}" with others
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              value={shareUrl}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="platform" className="text-right">
              Platform
            </Label>
            <Select
              value={platform}
              onValueChange={setPlatform}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="copy">
                  <div className="flex items-center">
                    <Copy className="h-4 w-4 mr-2" />
                    <span>Copy link</span>
                  </div>
                </SelectItem>
                <SelectItem value="twitter">
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2" />
                    <span>Twitter</span>
                  </div>
                </SelectItem>
                <SelectItem value="linkedin">
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2" />
                    <span>LinkedIn</span>
                  </div>
                </SelectItem>
                <SelectItem value="facebook">
                  <div className="flex items-center">
                    <FacebookIcon className="h-4 w-4 mr-2" />
                    <span>Facebook</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleShare} disabled={isSharing}>
            {isSharing ? "Sharing..." : "Share Achievement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
