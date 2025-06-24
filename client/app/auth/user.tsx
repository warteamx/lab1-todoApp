import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Auth from '../../components/Auth'
import Account from '../../components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function App() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View>
                {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
            </View>
        </View>
    )
}