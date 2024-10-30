import PostCard, { PostTypeCard } from "@/components/PostCard";
import SearchForm from "@/components/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: POSTS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Post, <br /> Connect With Bloger
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Posts, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Posts"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: PostTypeCard) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No posts found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
