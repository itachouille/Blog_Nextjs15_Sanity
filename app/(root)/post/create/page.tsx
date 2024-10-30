import { auth } from "@/auth";
import PostForm from "@/components/PostForm";
import { redirect } from "next/navigation";

const CreatePostPage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="green_container !min-h-[230px]">
        <h1 className="heading">Submit Your Post</h1>
      </section>

      <PostForm />
    </>
  );
};

export default CreatePostPage;
