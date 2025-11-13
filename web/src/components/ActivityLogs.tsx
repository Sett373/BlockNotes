import { ActivityLog } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { ArrowLeft, Download, Search, Shield, FileEdit, FilePlus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useState, useMemo } from 'react';

interface ActivityLogsProps {
  logs: ActivityLog[];
  onBack: () => void;
}

export function ActivityLogs({ logs, onBack }: ActivityLogsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = useMemo(() => {
    return logs.filter(log => 
      log.noteTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [logs, searchQuery]);

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Action', 'Note Title', 'Blockchain Hash'];
    const rows = filteredLogs.map(log => [
      format(log.timestamp, 'yyyy-MM-dd HH:mm:ss'),
      log.user,
      log.action,
      log.noteTitle,
      log.blockchainHash
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blocknotes-activity-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created':
        return <FilePlus className="w-4 h-4" />;
      case 'updated':
        return <FileEdit className="w-4 h-4" />;
      case 'deleted':
        return <Trash2 className="w-4 h-4" />;
      default:
        return <FileEdit className="w-4 h-4" />;
    }
  };

  const getActionBadge = (action: string) => {
    const variants: Record<string, any> = {
      created: 'default',
      updated: 'secondary',
      deleted: 'destructive'
    };
    return variants[action] || 'secondary';
  };

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
              <h2>Activity Logs</h2>
            </div>

            <Button onClick={handleExportCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm">
              All actions are recorded on the blockchain, providing a complete and immutable audit trail. 
              Each entry is cryptographically verified and timestamped.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Note Title</TableHead>
                <TableHead>Blockchain Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    No activity logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(log.timestamp, 'MMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      <Badge variant={getActionBadge(log.action)} className="gap-1">
                        {getActionIcon(log.action)}
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{log.noteTitle}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-primary" />
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {log.blockchainHash.slice(0, 16)}...
                        </code>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="mt-6 text-sm text-muted-foreground text-center">
          Showing {filteredLogs.length} of {logs.length} activity log entries
        </div>
      </main>
    </div>
  );
}
