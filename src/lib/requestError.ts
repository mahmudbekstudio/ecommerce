import { z } from 'zod';

export default (errors: z.ZodError) => {
    return errors.issues.reduce((acc, err) => {
        const field = err.path.join(".");
        acc[field] = err.message;
        return acc;
    }, {} as Record<string, string>)
}