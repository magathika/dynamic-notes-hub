import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      const notes: Note[] = JSON.parse(savedNotes);
      const foundNote = notes.find(n => n.id === id);
      setNote(foundNote || null);
    }
  }, [id]);

  const handleDelete = () => {
    if (!note) return;
    
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      const notes: Note[] = JSON.parse(savedNotes);
      const updatedNotes = notes.filter(n => n.id !== note.id);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      navigate("/notes");
    }
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-auto shadow-medium animate-scale-in">
          <h2 className="text-2xl font-semibold text-primary mb-4">Note not found</h2>
          <p className="text-muted-foreground mb-6">
            The note you're looking for doesn't exist or has been deleted.
          </p>
          <Link to="/notes">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header with Actions */}
        <div className="mb-8 animate-fade-in">
          <Link to="/notes">
            <Button variant="ghost" className="mb-6 hover:bg-secondary -ml-2 transition-all duration-200 hover:scale-105 hover:-translate-x-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all notes
            </Button>
          </Link>

          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary flex-1 animate-slide-up">
              {note.title}
            </h1>
            <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <Link to="/notes">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-secondary border-border transition-all duration-200 hover:scale-110 hover:rotate-6"
                  title="Edit note"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                onClick={handleDelete}
                variant="outline"
                size="icon"
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive border-border transition-all duration-200 hover:scale-110 hover:-rotate-6"
                title="Delete note"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <time>
              {new Date(note.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Note Content */}
        <Card className="p-8 md:p-10 shadow-medium bg-card border-border animate-slide-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: '200ms' }}>
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {note.content}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NoteDetail;
