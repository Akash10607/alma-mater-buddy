import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, BookOpen, MapPin, Utensils, Clock, FileText, Shirt } from "lucide-react";
import mrduLogo from "@/assets/mrdu-logo.png";
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
  { icon: MapPin, label: "Campus Facilities", query: "Show me campus facilities" },
  { icon: Utensils, label: "Dining Hours", query: "When are dining halls open?" },
  { icon: BookOpen, label: "Library Services", query: "Tell me about library services" },
  { icon: FileText, label: "Admin Procedures", query: "How do I register for classes?" },
  { icon: Shirt, label: "Uniform Policy", query: "What is the uniform policy?" },
];

const CAMPUS_RESPONSES = {
  schedules: "📅 **Campus Timings:** 9:15 AM - 3:45 PM (arrive 10 mins early - late arrivals face penalties)\n\n**1st Year Students:**\n• Classes: 9:15 AM start\n• Lunch: 12:00 PM - 12:45 PM\n• Break: 2:40 PM - 2:50 PM\n• End: 3:45 PM\n\n**2nd/3rd/4th Year Students:**\n• Classes: 9:15 AM start\n• Break: 11:05 AM - 11:15 AM\n• Lunch: 1:05 PM - 1:55 PM\n• End: 3:45 PM",
  facilities: "🏢 Our MRDU campus features: Main Library, Student Center, Computer Labs, Study Rooms, Administrative Buildings, and Academic Blocks. All buildings are accessible and WiFi-enabled. Campus operates from 9:15 AM to 3:45 PM.",
  dining: "🍽️ **Hostel Students Dining Hours:** 12:00 PM - 12:45 PM (strictly maintained). Main cafeteria and other dining options available during campus hours. Meal plans mandatory for hostel residents.",
  library: "📚 Library services: Study spaces during campus hours (9:15 AM - 3:45 PM), research assistance, computer labs, printing services, group study rooms (reservable online), and extensive digital resources. Librarian support available.",
  admin: "📋 Administrative procedures: Course registration via student portal, transcript requests online, and administrative office hours 9:15 AM - 3:45 PM weekdays. All students must arrive on campus before 9:05 AM.",
  uniform: "👔 **MRDU Uniform Policy:**\n• **Monday, Wednesday, Friday:** Formal dress (provided by management)\n• **Tuesday, Thursday:** Any informal dress\n• **Saturday:** T-shirt and jeans (provided by management)\n\nProper uniform compliance is mandatory. Non-compliance may result in penalties.",
  events: "🎉 Campus events and announcements are updated by the administration. Check the student portal or notice boards for latest event information and updates."
};

export const CampusChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm MRDU explores.ai 🎓 I can help you with class schedules, campus facilities, dining hours, library services, uniform policies, and administrative procedures. What would you like to know about MALLAREDDY DEEMED TO BE UNIVERSITY?",
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
    } else if (lowerQuery.includes("uniform") || lowerQuery.includes("dress") || lowerQuery.includes("clothes")) {
      return CAMPUS_RESPONSES.uniform;
    } else if (lowerQuery.includes("event") || lowerQuery.includes("announcement") || lowerQuery.includes("notice")) {
      return CAMPUS_RESPONSES.events;
    } else {
      return "I can help you with information about class schedules, campus facilities, dining services, library resources, administrative procedures, uniform policy, and campus events. Could you be more specific about what you're looking for?";
    }
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-subtle animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-campus text-primary-foreground p-6 shadow-soft">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <img src={mrduLogo} alt="MRDU Logo" className="h-12 w-12 rounded-full bg-white/10 p-1" />
            <div>
              <h1 className="text-2xl font-bold">MALLAREDDY DEEMED TO BE UNIVERSITY</h1>
              <p className="text-primary-foreground/80">MRDU explores.ai - Your intelligent campus companion</p>
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
                className="flex items-center gap-2 hover:bg-campus-primary hover:text-primary-foreground transition-smooth hover:scale-105 transform"
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
                      <img src={mrduLogo} alt="MRDU AI" className="h-4 w-4 rounded-full" />
                    </div>
                  )}
                  
                  <Card className={cn(
                    "max-w-[70%] p-4 shadow-message animate-scale-in",
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
                    <img src={mrduLogo} alt="MRDU AI" className="h-4 w-4 rounded-full" />
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