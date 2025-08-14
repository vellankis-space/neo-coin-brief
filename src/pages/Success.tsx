
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, Loader2 } from 'lucide-react'; // Added Loader2

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  let email = searchParams.get('email');
  // Cashfree forms may pass different transaction keys depending on integration
  const transactionId =
    searchParams.get('referenceId') ||
    searchParams.get('orderId') ||
    searchParams.get('txId') ||
    searchParams.get('transactionId');

  // Fallback: if email missing in query, use locally persisted value
  if (!email) {
    try {
      email = window.localStorage.getItem('checkout_email');
    } catch {}
  }

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [updateStatusError, setUpdateStatusError] = useState<string | null>(null);

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      if (email) {
        setIsUpdatingStatus(true);
        setUpdateStatusError(null);
        try {
          const response = await fetch('/api/update-subscription-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email,
              status: 'completed',
              transaction_id: transactionId
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update subscription status.');
          }
          console.log('Subscription status updated to completed for:', email, 'Transaction ID:', transactionId);
        } catch (error: any) {
          console.error('Error updating subscription status:', error);
          setUpdateStatusError(error.message || 'Could not update subscription status.');
        } finally {
          setIsUpdatingStatus(false);
        }
      } else {
        console.warn('No email found in URL for status update.');
      }
    };

    if (sessionId) {
      console.log('Checkout session ID:', sessionId);
      // You might still want to send sessionId to backend for verification
      // but the primary status update will be based on email for this flow.
    }

    updateSubscriptionStatus();
  }, [sessionId, email]); // Depend on sessionId and email

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-4 w-24 h-24 flex items-center justify-center">
            {isUpdatingStatus ? (
              <Loader2 className="text-blue-600 w-16 h-16 animate-spin" />
            ) : (
              <CircleCheck className="text-green-600 w-16 h-16" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold mt-4">
            {isUpdatingStatus ? 'Processing Payment...' : 'Payment Successful!'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {updateStatusError ? (
            <p className="text-red-600 mb-6">
              {updateStatusError} Please contact support if you believe this is an error.
            </p>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Thank you for subscribing to the Pro Newsletter! Your payment has been processed successfully.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                A confirmation has been sent to your email address. You now have full access to all our premium features.
              </p>
            </>
          )}
          <Button asChild disabled={isUpdatingStatus}>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
