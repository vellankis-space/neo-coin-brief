import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, Loader2 } from 'lucide-react';

const PaymentFailedPage = () => {
  const [searchParams] = useSearchParams();
  let email = searchParams.get('email');
  const transactionId =
    searchParams.get('referenceId') ||
    searchParams.get('orderId') ||
    searchParams.get('txId') ||
    searchParams.get('transactionId');
  if (!email) {
    try {
      email = window.localStorage.getItem('checkout_email');
    } catch {}
  }
  const errorMessage = searchParams.get('txMsg') || 'Payment was not completed successfully.';

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
              status: 'failed',
              transaction_id: transactionId
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update subscription status.');
          }
          console.log('Subscription status updated to failed for:', email, 'Transaction ID:', transactionId);
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

    updateSubscriptionStatus();
  }, [email, transactionId]);

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-red-100 rounded-full p-4 w-24 h-24 flex items-center justify-center">
            {isUpdatingStatus ? (
              <Loader2 className="text-blue-600 w-16 h-16 animate-spin" />
            ) : (
              <XCircle className="text-red-600 w-16 h-16" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold mt-4">
            {isUpdatingStatus ? 'Processing...' : 'Payment Failed'}
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
                {errorMessage}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Your subscription has not been activated. You can try again or contact support if you need assistance.
              </p>
            </>
          )}
          <div className="space-y-3">
            <Button asChild disabled={isUpdatingStatus} className="w-full">
              <Link to="/">Return to Homepage</Link>
            </Button>
            <Button asChild disabled={isUpdatingStatus} variant="outline" className="w-full">
              <Link to="/#pricing">Try Again</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailedPage; 