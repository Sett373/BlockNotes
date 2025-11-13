import { useState, useMemo } from 'react';
import { Note, User } from '../types';
import { NoteCard } from './NoteCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Plus, 
  Search, 
  Filter, 
  LogOut, 
  Settings,
  Activity,
  UserCog,
  Link2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DashboardProps {
  notes: Note[];
  user: User;
  onCreateNote: () => void;
  onSelectNote: (note: Note) => void;
  onViewActivityLogs: () => void;
  onViewAdmin: () => void;
  onViewProfile: () => void;
  onLogout: () => void;
}

export function Dashboard({ 
  notes, 
  user, 
  onCreateNote, 
  onSelectNote,
  onViewActivityLogs,
  onViewAdmin,
  onViewProfile,
  onLogout 
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'title'>('recent');
  const [filterTag, setFilterTag] = useState<string>('all');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach(note => note.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [notes]);

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let filtered = notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = filterTag === 'all' || note.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    });

    // Sort notes
    filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      } else if (sortBy === 'oldest') {
        return a.updatedAt.getTime() - b.updatedAt.getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [notes, searchQuery, sortBy, filterTag]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-primary">BlockNotes</h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onViewActivityLogs}
                className="hidden sm:inline-flex"
              >
                <Activity className="w-5 h-5" />
              </Button>

              {user.role === 'admin' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onViewAdmin}
                  className="hidden sm:inline-flex"
                >
                  <UserCog className="w-5 h-5" />
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p>{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="sm:hidden" onClick={onViewActivityLogs}>
                    <Activity className="w-4 h-4 mr-2" />
                    Activity Logs
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem className="sm:hidden" onClick={onViewAdmin}>
                      <UserCog className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={onViewProfile}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button onClick={onCreateNote} className="h-12 bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 mr-2" />
              Create New Note
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Filters:</span>
            </div>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No notes found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || filterTag !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first blockchain-secured note'}
            </p>
            {!searchQuery && filterTag === 'all' && (
              <Button onClick={onCreateNote} className="bg-primary hover:bg-primary/90">
                <Plus className="w-5 h-5 mr-2" />
                Create New Note
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {filteredNotes.map(note => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onClick={() => onSelectNote(note)}
                />
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Showing {filteredNotes.length} of {notes.length} notes
            </div>
          </>
        )}
      </main>
    </div>
  );
}