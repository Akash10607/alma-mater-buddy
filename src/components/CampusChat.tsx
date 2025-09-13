import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, BookOpen, MapPin, Utensils, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  category?: string;
}

const QUICK_ACTIONS = [
  { icon: Clock, label: "Class Schedules", query: "What are the class schedules?" },
  { icon: MapPin, label: "Campus Map", query: "Show me campus facilities" },
  { icon: Utensils, label: "Dining Hours", query: "When are dining halls open?" },
  { icon: BookOpen, label: "Library Services", query: "Tell me about library services" },
  { icon: FileText, label: "Admin Procedures", query: "How do I register for classes?" },
];

const CAMPUS_RESPONSES = {
  schedules: "📅 Class schedules vary by semester. Fall 2024 classes run Monday-Friday, 8:00 AM - 10:00 PM. You can find your specific schedule in the student portal or visit the Registrar's Office in the Admin Building.",
  facilities: "🏢 Our campus features: Main Library (24/7 during finals), Student Center, Fitness Center, Computer Labs, Study Rooms, and the new Science Building. All buildings are accessible and WiFi-enabled.",
  dining: "🍽️ Dining options include: Main Cafeteria (7 AM - 9 PM), Coffee Shop (6 AM - 11 PM), Food Trucks (11 AM - 3 PM), and the Late Night Diner (9 PM - 2 AM). Meal plans available!",
  library: "📚 Library services: 24/7 study spaces, research assistance, computer labs, printing services, group study rooms (reservable online), and extensive digital resources. Librarians available for research help.",
  admin: "📋 Key procedures: Course registration opens each semester via student portal, add/drop deadline is 2 weeks into semester, transcripts available online, and financial aid office hours are 9 AM - 5 PM weekdays."
};

export const CampusChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your Campus AI Assistant. I can help you with schedules, facilities, dining, library services, and administrative procedures. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const botResponse = generateResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("schedule") || lowerQuery.includes("class") || lowerQuery.includes("time")) {
      return CAMPUS_RESPONSES.schedules;
    } else if (lowerQuery.includes("facilit") || lowerQuery.includes("building") || lowerQuery.includes("map")) {
      return CAMPUS_RESPONSES.facilities;
    } else if (lowerQuery.includes("dining") || lowerQuery.includes("food") || lowerQuery.includes("eat")) {
      return CAMPUS_RESPONSES.dining;
    } else if (lowerQuery.includes("library") || lowerQuery.includes("book") || lowerQuery.includes("study")) {
      return CAMPUS_RESPONSES.library;
    } else if (lowerQuery.includes("register") || lowerQuery.includes("admin") || lowerQuery.includes("transcript")) {
      return CAMPUS_RESPONSES.admin;
    } else {
      return "I can help you with information about class schedules, campus facilities, dining services, library resources, and administrative procedures. Could you be more specific about what you're looking for?";
    }
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-campus text-primary-foreground p-6 shadow-soft">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Bot className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">MALLAREDDY DEEMED TO BE UNIVERSITY</h1>
              <p className="text-primary-foreground/80">AI Campus Assistant - Your guide to campus life and services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((action, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                onClick={() => handleQuickAction(action.query)}
                className="flex items-center gap-2 hover:bg-campus-primary hover:text-primary-foreground transition-smooth"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto h-full">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <div className="bg-campus-primary text-primary-foreground rounded-full p-2 h-fit">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  
                  <Card className={cn(
                    "max-w-[70%] p-4 shadow-message",
                    message.sender === "user" 
                      ? "bg-chat-user text-chat-user-foreground" 
                      : "bg-chat-bot text-chat-bot-foreground"
                  )}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={cn(
                      "text-xs mt-2 opacity-70",
                      message.sender === "user" ? "text-chat-user-foreground" : "text-chat-bot-foreground"
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </Card>

                  {message.sender === "user" && (
                    <div className="bg-campus-secondary text-primary-foreground rounded-full p-2 h-fit">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-campus-primary text-primary-foreground rounded-full p-2 h-fit">
                    <Bot className="h-4 w-4" />
                  </div>
                  <Card className="max-w-[70%] p-4 shadow-message bg-chat-bot">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-chat-bot-foreground/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-chat-bot-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-chat-bot-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-surface border-t">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              placeholder="Ask me anything about campus..."
              className="flex-1 bg-background border-border focus:ring-campus-primary"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="bg-campus-primary hover:bg-campus-primary-dark text-primary-foreground shadow-soft transition-smooth"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};