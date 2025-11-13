import { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { NoteEditor } from './components/NoteEditor';
import { ActivityLogs } from './components/ActivityLogs';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { Note, User } from './types';
import { mockNotes, mockActivityLogs, mockUser, mockAdminUser } from './lib/mockData';

type View = 'login' | 'register' | 'dashboard' | 'profile' | 'editor' | 'activity' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleLogin = (asAdmin: boolean = false) => {
    setCurrentUser(asAdmin ? mockAdminUser : mockUser);
    setCurrentView('dashboard');
  };

  const handleRegister = () => {
    setCurrentUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setCurrentView('editor');
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setCurrentView('editor');
  };

  const handleSaveNote = (updatedNote: Partial<Note>) => {
    if (selectedNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { 
              ...note, 
              ...updatedNote,
              versions: [
                ...note.versions,
                {
                  id: `v${note.versions.length + 1}`,
                  content: updatedNote.content || note.content,
                  timestamp: new Date(),
                  blockchainHash: updatedNote.blockchainHash || note.blockchainHash,
                  user: currentUser?.name || 'User'
                }
              ]
            }
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: updatedNote.id || Date.now().toString(),
        title: updatedNote.title || 'Untitled Note',
        content: updatedNote.content || '',
        createdAt: new Date(),
        updatedAt: updatedNote.updatedAt || new Date(),
        tags: updatedNote.tags || [],
        blockchainHash: updatedNote.blockchainHash || '',
        verified: updatedNote.verified || false,
        versions: [
          {
            id: 'v1',
            content: updatedNote.content || '',
            timestamp: new Date(),
            blockchainHash: updatedNote.blockchainHash || '',
            user: currentUser?.name || 'User'
          }
        ]
      };
      setNotes([newNote, ...notes]);
    }
    setCurrentView('dashboard');
  };

  const handleBackToDashboard = () => {
    setSelectedNote(null);
    setCurrentView('dashboard');
  };

  const handleViewActivityLogs = () => {
    setCurrentView('activity');
  };

  const handleViewAdmin = () => {
    setCurrentView('admin');
  };

  const handleViewProfile = () => {
    setCurrentView('profile');
  };

  const handleUpdateProfile = (updatedUser: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedUser });
    }
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="size-full">
      {currentView === 'login' && (
        <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />
      )}

      {currentView === 'register' && (
        <Register onRegister={handleRegister} onSwitchToLogin={handleSwitchToLogin} />
      )}

      {currentView === 'dashboard' && currentUser && (
        <Dashboard
          notes={notes}
          user={currentUser}
          onCreateNote={handleCreateNote}
          onSelectNote={handleSelectNote}
          onViewActivityLogs={handleViewActivityLogs}
          onViewAdmin={handleViewAdmin}
          onViewProfile={handleViewProfile}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'profile' && currentUser && (
        <Profile
          user={currentUser}
          onBack={handleBackToDashboard}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {currentView === 'editor' && (
        <NoteEditor
          note={selectedNote}
          onBack={handleBackToDashboard}
          onSave={handleSaveNote}
        />
      )}

      {currentView === 'activity' && (
        <ActivityLogs
          logs={mockActivityLogs}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'admin' && (
        <AdminDashboard onBack={handleBackToDashboard} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}