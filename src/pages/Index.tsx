import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 animate-scale-in">
          <FileText className="w-10 h-10 text-accent" />
        </div>
        <h1 className="mb-4 text-5xl md:text-6xl font-bold text-primary animate-fade-in" style={{ animationDelay: '100ms' }}>
          Notes App
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
          A beautiful place to capture your thoughts, ideas, and inspirations.
        </p>
        <Link to="/notes">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-medium animate-fade-in transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95"
            style={{ animationDelay: '300ms' }}
          >
            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
            Start Writing
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
