import { defineConfig } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
    schema: './prisma/schema.prisma',
    datasource: {
        // Use NON_POOLING (port 5432) for the CLI tools (db push/pull) 
        // as port 6543 often blocks traffic from local machines.
        url: process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL!,
    }
});
