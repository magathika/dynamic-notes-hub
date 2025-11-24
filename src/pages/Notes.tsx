import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Trash2, Edit2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingId 
          ? { ...note, title, content }
          : note
      ));
      setEditingId(null);
    } else {
      // Add new note
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setContent("");
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            My Notes
          </h1>
          <p className="text-muted-foreground text-lg">
            Capture your thoughts and ideas
          </p>
        </div>

        {/* Add/Edit Note Form */}
        <Card className="p-6 mb-8 shadow-medium bg-card border-border animate-slide-up transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            {editingId ? "Edit Note" : "Create New Note"}
          </h2>
          <div className="space-y-4">
            <Input
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg border-border bg-background transition-all duration-200 focus:ring-2 focus:ring-accent/20"
            />
            <Textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="resize-none border-border bg-background transition-all duration-200 focus:ring-2 focus:ring-accent/20"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAddNote}
                disabled={!title.trim() || !content.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4 mr-2" />
                {editingId ? "Update Note" : "Add Note"}
              </Button>
              {editingId && (
                <Button
                  onClick={() => {
                    setEditingId(null);
                    setTitle("");
                    setContent("");
                  }}
                  variant="outline"
                  className="border-border"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Search Bar */}
        {notes.length > 0 && (
          <div className="mb-6 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-200" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-border bg-card transition-all duration-200 focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>
        )}

        {/* Notes List */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50 animate-pulse" />
            <p className="text-muted-foreground text-lg">
              {searchQuery ? "No notes found matching your search" : "No notes yet. Create your first note above!"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-5">
            {filteredNotes.map((note, index) => (
              <Card
                key={note.id}
                className="p-5 md:p-6 shadow-soft hover:shadow-medium transition-all duration-300 bg-note-card hover:bg-note-hover border-border group animate-fade-in hover:scale-[1.02] hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <Link to={`/notes/${note.id}`} className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2 group-hover:text-accent transition-all duration-200">
                      {note.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {note.content}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </Link>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      onClick={() => handleEdit(note)}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-secondary transition-all duration-200 hover:scale-110"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(note.id)}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-destructive/10 hover:text-destructive transition-all duration-200 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
