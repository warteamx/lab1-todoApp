import postgres from 'postgres'
import { config } from '../config'

const connectionString = config.supabaseDB!

const sql = postgres(connectionString, {
    onnotice: (notice) => {
        console.log(` 📥 notice postgres:`, notice)
    },
})

export default sql