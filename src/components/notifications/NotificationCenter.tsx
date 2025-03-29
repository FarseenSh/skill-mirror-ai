
import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/components/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
  link?: string;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    // Load notifications from localStorage for immediate display
    const savedNotifications = localStorage.getItem(`skillmirror_notifications_${user.id}`);
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed);
      setUnreadCount(parsed.filter((n: Notification) => !n.read).length);
    }
    
    // Then fetch from database
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);
          
        if (error) throw error;
        
        if (data) {
          const formattedNotifications = data.map(n => ({
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.type as 'info' | 'success' | 'warning' | 'error',
            createdAt: n.created_at,
            read: n.read,
            link: n.link
          }));
          
          setNotifications(formattedNotifications);
          setUnreadCount(formattedNotifications.filter(n => !n.read).length);
          
          // Save to localStorage for faster loading next time
          localStorage.setItem(
            `skillmirror_notifications_${user.id}`, 
            JSON.stringify(formattedNotifications)
          );
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchNotifications();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('notification_changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, payload => {
        const newNotification = {
          id: payload.new.id,
          title: payload.new.title,
          message: payload.new.message,
          type: payload.new.type as 'info' | 'success' | 'warning' | 'error',
          createdAt: payload.new.created_at,
          read: false,
          link: payload.new.link
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(count => count + 1);
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAllAsRead = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);
        
      if (error) throw error;
      
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      
      // Update localStorage
      localStorage.setItem(
        `skillmirror_notifications_${user.id}`, 
        JSON.stringify(notifications.map(n => ({ ...n, read: true })))
      );
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const handleNotificationClick = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);
        
      if (error) throw error;
      
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
      
      setUnreadCount(count => Math.max(0, count - 1));
      
      // Update localStorage
      localStorage.setItem(
        `skillmirror_notifications_${user.id}`, 
        JSON.stringify(notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        ))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-lg font-semibold">Notifications</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-10rem)] py-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <AnimatePresence>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-3 p-3 rounded-lg border ${
                    notification.read ? 'opacity-70' : 'border-primary/50 bg-muted/50'
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${notification.read ? '' : 'text-primary'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </ScrollArea>
        
        <SheetFooter className="border-t pt-4 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            disabled={unreadCount === 0}
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
