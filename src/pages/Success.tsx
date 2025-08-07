
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from 'lucide-react';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Here you could optionally send the session_id to your backend
    // to verify the session and provision access, though the webhook
    // is the more reliable method.
    if (sessionId) {
      console.log('Checkout session ID:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-4 w-24 h-24 flex items-center justify-center">
            <CircleCheck className="text-green-600 w-16 h-16" />
          </div>
          <CardTitle className="text-2xl font-bold mt-4">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Thank you for subscribing to the Pro Newsletter! Your payment has been processed successfully.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            A confirmation has been sent to your email address. You now have full access to all our premium features.
          </p>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
