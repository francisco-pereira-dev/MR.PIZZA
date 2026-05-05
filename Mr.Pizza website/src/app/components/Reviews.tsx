import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Review } from "../data/reviews";

interface ReviewsProps {
  pizzaId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date">) => void;
}

export function Reviews({ pizzaId, reviews, onAddReview }: ReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const pizzaReviews = reviews.filter((r) => r.pizzaId === pizzaId);
  const averageRating =
    pizzaReviews.length > 0
      ? pizzaReviews.reduce((sum, r) => sum + r.rating, 0) / pizzaReviews.length
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview({
      pizzaId,
      userName,
      rating,
      comment,
    });
    setUserName("");
    setRating(5);
    setComment("");
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-600">
              ({pizzaReviews.length} avaliações)
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancelar" : "Escrever Avaliação"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Seu Nome</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="Digite seu nome"
              />
            </div>
            <div>
              <Label>Classificação</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Comentário</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Partilhe a sua experiência..."
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Publicar Avaliação
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {pizzaReviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-medium">{review.userName}</div>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(review.date).toLocaleDateString("pt-PT")}
              </span>
            </div>
            <p className="text-sm text-gray-700">{review.comment}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
