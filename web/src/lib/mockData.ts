import { Note, ActivityLog, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  role: 'user'
};

export const mockAdminUser: User = {
  id: '2',
  name: 'Admin User',
  email: 'admin@blocknotes.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  role: 'admin'
};

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Project Planning Meeting Notes',
    content: 'Discussed Q4 roadmap and resource allocation. Key points:\n- Need to hire 2 new developers\n- Launch date moved to Nov 15\n- Budget approved for marketing campaign',
    createdAt: new Date('2025-10-15T10:30:00'),
    updatedAt: new Date('2025-10-20T14:20:00'),
    tags: ['work', 'planning', 'Q4'],
    blockchainHash: '0x7a8f9c2e4b1d6f3a8e5c2b9d4f7a1e3c',
    verified: true,
    versions: [
      {
        id: 'v1',
        content: 'Discussed Q4 roadmap and resource allocation.',
        timestamp: new Date('2025-10-15T10:30:00'),
        blockchainHash: '0x7a8f9c2e4b1d6f3a8e5c2b9d4f7a1e3c',
        user: 'John Doe'
      },
      {
        id: 'v2',
        content: 'Discussed Q4 roadmap and resource allocation. Key points:\n- Need to hire 2 new developers\n- Launch date moved to Nov 15\n- Budget approved for marketing campaign',
        timestamp: new Date('2025-10-20T14:20:00'),
        blockchainHash: '0x9b3e7c5a1f8d2e4b6a9c3f7d1e5a8b2c',
        user: 'John Doe'
      }
    ]
  },
  {
    id: '2',
    title: 'Research: Blockchain Security',
    content: 'Key findings on blockchain security mechanisms:\n\n1. Immutability through cryptographic hashing\n2. Distributed consensus algorithms\n3. Public key cryptography\n\nReferences: Bitcoin whitepaper, Ethereum documentation',
    createdAt: new Date('2025-10-18T09:15:00'),
    updatedAt: new Date('2025-10-18T09:15:00'),
    tags: ['research', 'blockchain', 'security'],
    blockchainHash: '0x3c8e5a2f9b4d7e1a6c3f8b5d2e9a4c7f',
    verified: true,
    versions: [
      {
        id: 'v1',
        content: 'Key findings on blockchain security mechanisms:\n\n1. Immutability through cryptographic hashing\n2. Distributed consensus algorithms\n3. Public key cryptography\n\nReferences: Bitcoin whitepaper, Ethereum documentation',
        timestamp: new Date('2025-10-18T09:15:00'),
        blockchainHash: '0x3c8e5a2f9b4d7e1a6c3f8b5d2e9a4c7f',
        user: 'John Doe'
      }
    ]
  },
  {
    id: '3',
    title: 'Weekly Goals - Oct 21',
    content: '⚡ This Week:\n- Complete authentication module\n- Review PRs from team\n- Prepare presentation for stakeholders\n- Update documentation\n\n📅 Deadlines:\n- Friday: Submit quarterly report',
    createdAt: new Date('2025-10-21T08:00:00'),
    updatedAt: new Date('2025-10-21T08:00:00'),
    tags: ['goals', 'weekly', 'tasks'],
    blockchainHash: '0x5d9a3e7c1f4b8e2a6d3c9f5b7e1a4c8d',
    verified: true,
    versions: [
      {
        id: 'v1',
        content: '⚡ This Week:\n- Complete authentication module\n- Review PRs from team\n- Prepare presentation for stakeholders\n- Update documentation\n\n📅 Deadlines:\n- Friday: Submit quarterly report',
        timestamp: new Date('2025-10-21T08:00:00'),
        blockchainHash: '0x5d9a3e7c1f4b8e2a6d3c9f5b7e1a4c8d',
        user: 'John Doe'
      }
    ]
  },
  {
    id: '4',
    title: 'Book Notes: Clean Code',
    content: 'Chapter 3: Functions\n\n- Functions should be small\n- Do one thing and do it well\n- Descriptive names are important\n- Prefer fewer arguments\n- No side effects\n\nKey takeaway: Write code that reads like well-written prose.',
    createdAt: new Date('2025-10-12T19:45:00'),
    updatedAt: new Date('2025-10-12T19:45:00'),
    tags: ['books', 'programming', 'learning'],
    blockchainHash: '0x8e2b5f9a3c7d1e4f6b9a2c8d5e7f1a3b',
    verified: true,
    versions: [
      {
        id: 'v1',
        content: 'Chapter 3: Functions\n\n- Functions should be small\n- Do one thing and do it well\n- Descriptive names are important\n- Prefer fewer arguments\n- No side effects\n\nKey takeaway: Write code that reads like well-written prose.',
        timestamp: new Date('2025-10-12T19:45:00'),
        blockchainHash: '0x8e2b5f9a3c7d1e4f6b9a2c8d5e7f1a3b',
        user: 'John Doe'
      }
    ]
  },
  {
    id: '5',
    title: 'Travel Itinerary - Japan 2026',
    content: 'Day 1-3: Tokyo\n- Shibuya crossing\n- Senso-ji Temple\n- TeamLab Borderless\n\nDay 4-5: Kyoto\n- Fushimi Inari\n- Arashiyama Bamboo Grove\n- Traditional tea ceremony\n\nDay 6-7: Osaka\n- Osaka Castle\n- Dotonbori street food',
    createdAt: new Date('2025-10-10T16:30:00'),
    updatedAt: new Date('2025-10-19T11:20:00'),
    tags: ['travel', 'japan', 'planning'],
    blockchainHash: '0x2f7e9b4c8a3d5e1f7b2c6a9d4e8f3a5c',
    verified: true,
    versions: [
      {
        id: 'v1',
        content: 'Day 1-3: Tokyo\n- Shibuya crossing\n- Senso-ji Temple\n\nDay 4-5: Kyoto\n- Fushimi Inari',
        timestamp: new Date('2025-10-10T16:30:00'),
        blockchainHash: '0x2f7e9b4c8a3d5e1f7b2c6a9d4e8f3a5c',
        user: 'John Doe'
      },
      {
        id: 'v2',
        content: 'Day 1-3: Tokyo\n- Shibuya crossing\n- Senso-ji Temple\n- TeamLab Borderless\n\nDay 4-5: Kyoto\n- Fushimi Inari\n- Arashiyama Bamboo Grove\n- Traditional tea ceremony\n\nDay 6-7: Osaka\n- Osaka Castle\n- Dotonbori street food',
        timestamp: new Date('2025-10-19T11:20:00'),
        blockchainHash: '0x9a4c7e2b5f8d3a1e6c9f4b7d2e5a8c3f',
        user: 'John Doe'
      }
    ]
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    noteId: '3',
    noteTitle: 'Weekly Goals - Oct 21',
    action: 'created',
    user: 'John Doe',
    timestamp: new Date('2025-10-21T08:00:00'),
    blockchainHash: '0x5d9a3e7c1f4b8e2a6d3c9f5b7e1a4c8d'
  },
  {
    id: '2',
    noteId: '1',
    noteTitle: 'Project Planning Meeting Notes',
    action: 'updated',
    user: 'John Doe',
    timestamp: new Date('2025-10-20T14:20:00'),
    blockchainHash: '0x9b3e7c5a1f8d2e4b6a9c3f7d1e5a8b2c'
  },
  {
    id: '3',
    noteId: '5',
    noteTitle: 'Travel Itinerary - Japan 2026',
    action: 'updated',
    user: 'John Doe',
    timestamp: new Date('2025-10-19T11:20:00'),
    blockchainHash: '0x9a4c7e2b5f8d3a1e6c9f4b7d2e5a8c3f'
  },
  {
    id: '4',
    noteId: '2',
    noteTitle: 'Research: Blockchain Security',
    action: 'created',
    user: 'John Doe',
    timestamp: new Date('2025-10-18T09:15:00'),
    blockchainHash: '0x3c8e5a2f9b4d7e1a6c3f8b5d2e9a4c7f'
  },
  {
    id: '5',
    noteId: '1',
    noteTitle: 'Project Planning Meeting Notes',
    action: 'created',
    user: 'John Doe',
    timestamp: new Date('2025-10-15T10:30:00'),
    blockchainHash: '0x7a8f9c2e4b1d6f3a8e5c2b9d4f7a1e3c'
  },
  {
    id: '6',
    noteId: '4',
    noteTitle: 'Book Notes: Clean Code',
    action: 'created',
    user: 'John Doe',
    timestamp: new Date('2025-10-12T19:45:00'),
    blockchainHash: '0x8e2b5f9a3c7d1e4f6b9a2c8d5e7f1a3b'
  },
  {
    id: '7',
    noteId: '5',
    noteTitle: 'Travel Itinerary - Japan 2026',
    action: 'created',
    user: 'John Doe',
    timestamp: new Date('2025-10-10T16:30:00'),
    blockchainHash: '0x2f7e9b4c8a3d5e1f7b2c6a9d4e8f3a5c'
  }
];
