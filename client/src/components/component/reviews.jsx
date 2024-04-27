import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";

export function Reviews() {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    (<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
        <h1 className="text-3xl font-bold">All Reviews (3)</h1>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  The customer service I received was exceptional. The support team went above and beyond to address my
                  concerns.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Alex Smith</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  I recently purchased the SparkleShine Home Cleaning Robot, and it has been a game-changer in my life.
                  I used to spend hours every weekend cleaning my house, but now I can simply turn on this little robot
                  and let it do the work. It's incredibly efficient, navigating around obstacles with ease. The only
                  reason I didn't give it a perfect 5-star rating is that it occasionally gets stuck under low
                  furniture. Overall, it's been a great addition to my home, saving me time and effort.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Emily Parker</h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  The battery life is impressive, lasting me for long-haul flights without any issues. They are
                  comfortable to wear for extended periods, and I appreciate the sleek design. Worth every penny, and
                  I'd recommend these headphones to anyone who values high-quality audio and peace and quiet.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Leave a Review</h2>
          <p className="text-gray-500 dark:text-gray-400">Share your experience with the service.</p>
          <form className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>

          <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>



            </div>
            <div className="space-y-2">
              <Label htmlFor="review">Review</Label>
              <Textarea id="review" placeholder="Enter your review" required />
            </div>
            <Button className="" type="submit">
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </div>)
  );
}

function StarIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>)
  );
}
