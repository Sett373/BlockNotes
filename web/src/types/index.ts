export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  blockchainHash: string;
  verified: boolean;
  versions: NoteVersion[];
}

export interface NoteVersion {
  id: string;
  content: string;
  timestamp: Date;
  blockchainHash: string;
  user: string;
}

export interface ActivityLog {
  id: string;
  noteId: string;
  noteTitle: string;
  action: 'created' | 'updated' | 'deleted';
  user: string;
  timestamp: Date;
  blockchainHash: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
}
