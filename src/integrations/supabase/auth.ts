import { supabase } from '@/integrations/supabase/client';

// Function to subscribe to the newsletter using Supabase Auth
export const subscribeToNewsletter = async (email: string) => {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format.');
  }

  try {
    // Check if user already exists
    const { data: { user }, error: fetchError } = await supabase.auth.getUser();
    
    // If user is already logged in with a different email, we should handle that case
    // For now, we'll focus on the server-side implementation
    
    // Since we're using server-side auth management, we'll just call our API
    const response = await fetch('/api/save-email-to-supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to subscribe.');
    }

    return responseData;
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    throw error;
  }
};

// Function to get subscription status
export const getSubscriptionStatus = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }

    if (!user) {
      return { isSubscribed: false, status: null };
    }

    // Check user metadata for subscription status
    const subscriptionStatus = user.user_metadata?.subscription_status || null;
    
    return { 
      isSubscribed: subscriptionStatus === 'active', 
      status: subscriptionStatus,
      email: user.email
    };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return { isSubscribed: false, status: null, error: error.message };
  }
};