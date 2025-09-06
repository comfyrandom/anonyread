import { supabase } from './supabaseClient'; // Your Supabase client initialization

export const storageService = {
    // Save encrypted post to Supabase
    savePost: async (postId, encryptedContent, publicKey) => {
        try {
            const { data, error } = await supabase
                .from('encrypted_posts')
                .upsert({
                    id: postId,
                    content: encryptedContent,
                    public_key: publicKey
                }, {
                    onConflict: 'id'
                });

            if (error) {
                console.error("Error saving post:", error);
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error saving post:", error);
            return false;
        }
    },

    // Load encrypted post from Supabase
    loadPost: async (postId) => {
        try {
            const { data, error } = await supabase
                .from('encrypted_posts')
                .select('*')
                .eq('id', postId)
                .single();

            if (error) {
                console.error("Error loading post:", error);
                return null;
            }
            return data;
        } catch (error) {
            console.error("Error loading post:", error);
            return null;
        }
    },

    // Get all post IDs from Supabase
    getAllPostIds: async () => {
        try {
            const { data, error } = await supabase
                .from('encrypted_posts')
                .select('id');

            if (error) {
                console.error("Error getting post IDs:", error);
                return [];
            }
            return data.map(post => post.id);
        } catch (error) {
            console.error("Error getting post IDs:", error);
            return [];
        }
    }
};