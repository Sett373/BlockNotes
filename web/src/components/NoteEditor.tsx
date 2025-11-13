import { useState, useEffect } from 'react';
import { Note, NoteVersion } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Save, 
  Shield, 
  CheckCircle2, 
  History,
  Tag as TagIcon,
  X,
  Bold,
  Italic,
  List
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { format } from 'date-fns';
import { toast } from 'sonner@2.0.3';

interface NoteEditorProps {
  note: Note | null;
  onBack: () => void;
  onSave: (note: Partial<Note>) => void;
}

export function NoteEditor({ note, onBack, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<NoteVersion | null>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    }
  }, [note]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your note');
      return;
    }

    setIsSaving(true);
    
    // Simulate blockchain verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const updatedNote: Partial<Note> = {
      id: note?.id || Date.now().toString(),
      title,
      content,
      tags,
      updatedAt: new Date(),
      blockchainHash: '0x' + Math.random().toString(16).slice(2, 34),
      verified: true,
    };

    onSave(updatedNote);
    setIsSaving(false);
    
    toast.success(
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-secondary" />
        <span>Note secured on blockchain</span>
      </div>
    );
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const insertFormatting = (before: string, after: string = before) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newContent = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newContent);
    
    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2>{note ? 'Edit Note' : 'New Note'}</h2>
            </div>

            <div className="flex items-center gap-3">
              {note && (
                <Button
                  variant="outline"
                  onClick={() => setShowVersionHistory(true)}
                  className="hidden sm:flex"
                >
                  <History className="w-4 h-4 mr-2" />
                  Version History
                </Button>
              )}
              
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? (
                  <>
                    <Shield className="w-4 h-4 mr-2 animate-pulse" />
                    Securing...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save & Verify
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
          {/* Blockchain Status */}
          {note?.verified && (
            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="text-sm">Verified on blockchain</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {note.blockchainHash}
              </span>
            </div>
          )}

          {/* Title */}
          <div>
            <Input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0 border-b rounded-none px-0 text-2xl h-auto py-2 focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="bg-accent/20 text-accent-foreground hover:bg-accent/30 pr-1"
                >
                  <TagIcon className="w-3 h-3 mr-1" />
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:bg-accent/40 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1"
              />
              <Button onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex gap-2 p-2 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting('**')}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting('_')}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const lines = content.split('\n');
                const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                const start = textarea?.selectionStart || 0;
                const currentLine = content.substring(0, start).split('\n').length - 1;
                lines[currentLine] = '- ' + lines[currentLine];
                setContent(lines.join('\n'));
              }}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div>
            <Textarea
              placeholder="Start typing your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] resize-none border-0 focus-visible:ring-0 px-0"
            />
          </div>

          {/* Character Count */}
          <div className="flex justify-between text-xs text-muted-foreground pt-4 border-t">
            <span>{content.length} characters</span>
            <span>{content.split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </div>
      </main>

      {/* Version History Dialog */}
      <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
            <DialogDescription>
              View previous versions of this note. All versions are immutably stored on the blockchain.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {note?.versions.map((version, index) => (
              <div 
                key={version.id}
                className="p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                onClick={() => setSelectedVersion(selectedVersion?.id === version.id ? null : version)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant={index === note.versions.length - 1 ? "default" : "secondary"}>
                      {index === note.versions.length - 1 ? 'Current' : `Version ${note.versions.length - index - 1}`}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(version.timestamp, 'MMM d, yyyy HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="font-mono">{version.blockchainHash.slice(0, 12)}...</span>
                  </div>
                </div>

                {selectedVersion?.id === version.id && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded">
                      {version.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
