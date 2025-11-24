import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10">
          <FileText className="w-10 h-10 text-accent" />
        </div>
        <h1 className="mb-4 text-5xl md:text-6xl font-bold text-primary">
          Notes App
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          A beautiful place to capture your thoughts, ideas, and inspirations.
        </p>
        <Link to="/notes">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-medium"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Writing
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
