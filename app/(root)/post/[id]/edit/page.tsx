import PostForm from "@/components/PostForm";
import { client } from "@/sanity/lib/client";
import { POST_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const post = await Promise.all([client.fetch(POST_BY_ID_QUERY, { id })]);

  if (!post) return notFound();

  const { title, description, image, pitch, category } = post;

  return <PostForm />;
};

export default EditPostPage;
