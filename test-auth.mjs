// Supabase Auth Test
// This file tests the Supabase authentication integration for newsletter subscriptions

import { createClient } from '@supabase/supabase-js';

// These would normally come from environment variables
const SUPABASE_URL = 'https://llxyzlufnryvqshouqyl.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'your_service_role_key_here';

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function testAuth() {
  try {
    console.log('Testing Supabase Auth integration...');
    
    // Test 1: List existing users (requires service role key)
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.log('❌ Error listing users:', listError.message);
    } else {
      console.log('✅ Successfully listed users. Total users:', users?.users?.length || 0);
    }
    
    // Test 2: Create a test user (simulating newsletter subscription)
    const testEmail = `test-${Date.now()}@example.com`;
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: testEmail,
      email_confirm: true, // Auto-confirm for newsletter subscriptions
      user_metadata: {
        subscription_status: 'active',
        subscribed_at: new Date().toISOString()
      }
    });
    
    if (createError) {
      console.log('❌ Error creating test user:', createError.message);
    } else {
      console.log('✅ Successfully created test user:', newUser?.user?.email);
      
      // Test 3: Update user metadata
      const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
        newUser.user.id,
        {
          user_metadata: {
            subscription_status: 'active',
            subscribed_at: new Date().toISOString(),
            last_updated: new Date().toISOString()
          }
        }
      );
      
      if (updateError) {
        console.log('❌ Error updating user:', updateError.message);
      } else {
        console.log('✅ Successfully updated user metadata');
      }
      
      // Clean up: Delete test user
      const { error: deleteError } = await supabase.auth.admin.deleteUser(newUser.user.id);
      
      if (deleteError) {
        console.log('❌ Error deleting test user:', deleteError.message);
      } else {
        console.log('✅ Successfully deleted test user');
      }
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the test
testAuth();