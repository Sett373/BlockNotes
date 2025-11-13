import { Button } from './ui/button';
import { Lock, Shield, FileCheck, Link2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface AuthScreenProps {
  onLogin: (asAdmin?: boolean) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-primary mb-2">BlockNotes</h1>
            <p className="text-muted-foreground">Secure Notes on the Blockchain</p>
          </div>

          {/* Security Benefits */}
          <div className="mb-8 space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">
                  <span className="text-primary">Immutable & Secure:</span> Your notes are protected by blockchain technology
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <FileCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">
                  <span className="text-secondary">Verified Integrity:</span> Every edit is cryptographically verified
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
              <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">
                  <span className="text-accent">Full Transparency:</span> Complete audit trail of all changes
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <Button 
            onClick={onLogin}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>

          {/* Privacy Notice */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy. 
            Your data is encrypted and secured on the blockchain.
          </p>

          {/* Demo Mode */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-center text-muted-foreground mb-3">Demo Mode</p>
            <div className="flex gap-2">
              <Button
                onClick={() => onLogin(false)}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                Login as User
              </Button>
              <Button
                onClick={() => onLogin(true)}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                Login as Admin
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Trusted by students, professionals, and organizations worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
