import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Reviews } from "./Reviews";
import { Pizza } from "../types";
import { Review } from "../data/reviews";

interface ReviewsDialogProps {
  pizza: Pizza | null;
  open: boolean;
  onClose: () => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date">) => void;
}

export function ReviewsDialog({
  pizza,
  open,
  onClose,
  reviews,
  onAddReview,
}: ReviewsDialogProps) {
  if (!pizza) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Avaliações - {pizza.name}</DialogTitle>
          <DialogDescription>
            Veja o que os clientes dizem sobre esta pizza
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Reviews
            pizzaId={pizza.id}
            reviews={reviews}
            onAddReview={onAddReview}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}