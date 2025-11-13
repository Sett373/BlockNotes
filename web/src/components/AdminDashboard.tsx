import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  Activity, 
  TrendingUp,
  Shield,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { User } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
}

const mockUsers: (User & { notesCount: number; lastActive: Date })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'user',
    notesCount: 5,
    lastActive: new Date('2025-10-21T08:00:00')
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@blocknotes.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    role: 'admin',
    notesCount: 12,
    lastActive: new Date('2025-10-21T14:30:00')
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'user',
    notesCount: 8,
    lastActive: new Date('2025-10-20T16:45:00')
  },
  {
    id: '4',
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    role: 'user',
    notesCount: 3,
    lastActive: new Date('2025-10-19T10:20:00')
  }
];

const stats = [
  {
    title: 'Total Users',
    value: '247',
    change: '+12%',
    icon: Users,
    color: 'text-primary'
  },
  {
    title: 'Total Notes',
    value: '1,834',
    change: '+23%',
    icon: FileText,
    color: 'text-secondary'
  },
  {
    title: 'Blockchain Verifications',
    value: '3,142',
    change: '+18%',
    icon: Shield,
    color: 'text-accent'
  },
  {
    title: 'Active Today',
    value: '89',
    change: '+5%',
    icon: Activity,
    color: 'text-blue-600'
  }
];

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2>Admin Dashboard</h2>
            </div>

            <Badge variant="default" className="bg-primary">
              Administrator
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className="flex items-center gap-1 text-secondary">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
              <h3>{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          ))}
        </div>

        {/* System Status */}
        <Card className="p-6 mb-8">
          <h3 className="mb-4">Blockchain System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p>Blockchain Network</p>
                <p className="text-sm text-muted-foreground">Operational</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p>Verification Service</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p>Avg. Verification Time</p>
                <p className="text-sm text-muted-foreground">2.3 seconds</p>
              </div>
            </div>
          </div>
        </Card>

        {/* User Management */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>User Management</h3>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.notesCount}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.lastActive.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Analytics Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'Created new note', time: '5 min ago' },
                { user: 'Jane Smith', action: 'Updated note', time: '12 min ago' },
                { user: 'Bob Wilson', action: 'Deleted note', time: '1 hour ago' },
                { user: 'Admin User', action: 'Added new user', time: '2 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">System Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Storage Used</span>
                  <span>68%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>API Requests (today)</span>
                  <span>82%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Blockchain Sync</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
