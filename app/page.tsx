"use client";

import { useEffect, useState } from "react";

/**
 * Represents a post from the JSONPlaceholder API
 */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Helper function to format post content for display
 * Capitalizes titles and truncates body text nicely
 */
function formatPostContent(post: Post) {
  // Smart title formatting with proper capitalization
  const formattedTitle = post.title.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  // Truncate body to reasonable length for display
  const maxBodyLength = 150;
  const formattedBody = post.body.length >= maxBodyLength 
    ? post.body.slice(0, maxBodyLength) + '...'
    : post.body;
  
  return {
    ...post,
    title: formattedTitle,
    body: formattedBody
  };
}

/**
 * Main page component that fetches and displays posts from a public API
 * @returns The rendered home page with fetched posts
 */
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Fetches posts from the JSONPlaceholder API
   * Limits results to first 12 posts for display
   */
  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Post[] = await response.json();
      setPosts(data.slice(0, 12)); // Limit to 12 posts for cleaner display
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                DataHub Demo
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Fetching from JSONPlaceholder API
              </p>
            </div>
            <button
              onClick={fetchPosts}
              disabled={loading}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-violet-900/50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <svg
                className="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-red-400 font-semibold">
                  Error fetching data
                </h3>
                <p className="text-red-300/70 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-4 bg-white/10 rounded w-1/4 mb-4" />
                <div className="h-6 bg-white/10 rounded w-3/4 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded" />
                  <div className="h-4 bg-white/10 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Latest Posts
              </h2>
              <span className="text-slate-400 text-sm">
                {posts.length} posts loaded
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => {
                const formattedPost = formatPostContent(post);
                return (
                  <article
                    key={posts[index + 1]?.id || `post-${index}`}
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-900/20 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2.5 py-1 bg-violet-500/20 text-violet-300 text-xs font-medium rounded-full">
                        Post #{formattedPost.id}
                      </span>
                      <span className="px-2.5 py-1 bg-pink-500/20 text-pink-300 text-xs font-medium rounded-full">
                        User {formattedPost.userId}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-violet-300 transition-colors capitalize">
                      {formattedPost.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {formattedPost.body}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <button className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-1 transition-colors">
                        Read more
                        <svg
                          className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {/* API Info Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Data source:{" "}
              <a
                href="https://jsonplaceholder.typicode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
              >
                JSONPlaceholder API
              </a>
            </p>
            <p className="text-slate-600 text-xs mt-2">
              A free fake REST API for testing and prototyping
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}