import { Note } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <Card 
      className="p-5 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/20"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="flex-1 line-clamp-1">{note.title}</h3>
        {note.verified && (
          <div className="flex items-center gap-1.5 bg-secondary/10 text-secondary px-2.5 py-1 rounded-full flex-shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-xs">Verified</span>
          </div>
        )}
      </div>

      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
        {note.content}
      </p>

      <div className="flex items-center flex-wrap gap-2 mb-3">
        {note.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs bg-accent/20 text-accent-foreground hover:bg-accent/30">
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Updated {formatDistanceToNow(note.updatedAt, { addSuffix: true })}</span>
        </div>
        <div className="flex items-center gap-1.5 text-primary">
          <Shield className="w-3.5 h-3.5" />
          <span className="font-mono text-xs truncate max-w-[100px]">
            {note.blockchainHash.slice(0, 10)}...
          </span>
        </div>
      </div>
    </Card>
  );
}
