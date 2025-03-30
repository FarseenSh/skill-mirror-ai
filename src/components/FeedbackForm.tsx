
import { useState } from "react";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface FeedbackFormProps {
  trigger?: React.ReactNode;
}

export function FeedbackForm({ trigger }: FeedbackFormProps) {
  const [open, setOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Feedback submitted! Thank you for your message.");
    setFeedbackForm({ name: "", email: "", message: "" });
    setOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Leave Feedback</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Us Feedback</DialogTitle>
          <DialogDescription>
            We'd love to hear your thoughts on SkillMirror!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input 
                placeholder="Your Name" 
                name="name" 
                value={feedbackForm.name} 
                onChange={handleInputChange} 
                className="bg-background/50"
                required
              />
            </div>
            <div>
              <Input 
                type="email" 
                placeholder="Your Email" 
                name="email" 
                value={feedbackForm.email} 
                onChange={handleInputChange} 
                className="bg-background/50"
                required
              />
            </div>
          </div>
          <div>
            <Textarea 
              placeholder="Your Message" 
              name="message" 
              value={feedbackForm.message} 
              onChange={handleInputChange} 
              className="min-h-[120px] bg-background/50"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
