"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/actions";

const PostForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);

      const result = await createPost(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your post has been created successfully",
          variant: "default",
        });

        router.push(`/post/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occured",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="post-form">
      <div>
        <label htmlFor="title" className="post-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="post-form_input"
          required
          placeholder="Post Title"
        />
        {errors.title && <p className="post-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="post-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="post-form_textarea"
          placeholder="Post Description"
        />
        {errors.description && (
          <p className="post-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="post-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="post-form_input"
          required
          placeholder="Post Category (Tech, Health, Education ...)"
        />
        {errors.category && (
          <p className="post-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="post-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="post-form_input"
          required
          placeholder="Post Image URL"
        />
        {errors.link && <p className="post-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="post-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Write your post here!",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="post-form_error">{errors.pitch}</p>}
      </div>
      <Button
        type="submit"
        className="post-form_btn text-black"
        disabled={isPending}
      >
        {isPending ? "Submitting ..." : "Submit"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default PostForm;
