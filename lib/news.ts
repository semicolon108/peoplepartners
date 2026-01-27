import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const newsDirectory = path.join(process.cwd(), 'content/news');

export interface NewsPost {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    author: string;
    content: string;
}

export function getAllNews(): NewsPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(newsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(newsDirectory);
    const allNewsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(newsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            slug: id,
            content: matterResult.content,
            ...(matterResult.data as { title: string; date: string; category: string; excerpt: string; author: string }),
        };
    });

    // Sort posts by date
    return allNewsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getNewsBySlug(slug: string): NewsPost | null {
    try {
        const fullPath = path.join(newsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        return {
            slug,
            content: matterResult.content,
            ...(matterResult.data as { title: string; date: string; category: string; excerpt: string; author: string }),
        };
    } catch (error) {
        return null; // Return null if file doesn't exist
    }
}
