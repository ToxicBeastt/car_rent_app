export interface Profile {
    id: string;
    username: string; // Ensure username is included
}

export interface User {
    user: Profile; // This should match the structure used in auth.ts
    username: string; // Add username directly to User interface
}
