import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import LogIn from '@/app/views/(auth)/LogIn';

const LoginPage = () => {
    return (
       <>
        <LogIn/>
       </>
    );
};
export default LoginPage;
