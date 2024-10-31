import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Post } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";
import { Dialog } from "./ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";
import { DeletePostAlertDialog } from "./DeletePostAlertDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
export type PostTypeCard = Omit<Post, "author"> & { author?: Author };

const PostCard = async ({ post }: { post: PostTypeCard }) => {
  const {
    _id,
    image,
    _createdAt,
    views,
    author,
    title,
    category,
    description,
  } = post;

  return (
    <li className="post-card group">
      <div className="flex-between">
        <p className="post-card_date">{formatDate(_createdAt)}</p>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <EyeIcon className="size-6 text-primary group-hover:text-black" />
            <span className="text-16-medium">{views}</span>
          </div>

          <Dialog>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="bg-primary-100 group-hover:bg-white-100"
                >
                  <Button variant="outline" className="size-8 p-0">
                    <div className="sr-only">Action Menu</div>
                    <DotsHorizontalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white-100 min-w-10">
                  <DropdownMenuItem asChild>
                    <Link
                      className="cursor-pointer hover:bg-primary-100"
                      href={`/post/${_id}/edit`}
                    >
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer hover:bg-red-400">
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeletePostAlertDialog id={_id} />
            </AlertDialog>
          </Dialog>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/post/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`user/${author?._id}`}>
          <Image
            src={author?.image}
            alt={author?.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/post/${_id}`}>
        <p className="post-card_desc">{description}</p>
        <img src={image} alt="post image" className="post-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="post-card_btn" asChild>
          <Link href={`/post/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default PostCard;

export const PostCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="post-card_skeleton" />
      </li>
    ))}
  </>
);
