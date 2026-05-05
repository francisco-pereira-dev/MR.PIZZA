import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { CheckCircle2, Clock, Truck, Package } from "lucide-react";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "on-the-way" | "delivered";

export interface Order {
  id: string;
  status: OrderStatus;
  estimatedTime: number; // minutes
  createdAt: Date;
}

interface OrderTrackingProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

export function OrderTracking({ open, onClose, order }: OrderTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("pending");
  
  useEffect(() => {
    if (!order) return;

    // Calculate status based on elapsed time in SECONDS
    const updateStatus = () => {
      const elapsed = Math.floor(
        (new Date().getTime() - order.createdAt.getTime()) / 1000
      );

      if (elapsed < 3) {
        setCurrentStatus("pending");
      } else if (elapsed < 6) {
        setCurrentStatus("confirmed");
      } else if (elapsed < 9) {
        setCurrentStatus("preparing");
      } else if (elapsed < 15) {
        setCurrentStatus("on-the-way");
      } else {
        setCurrentStatus("delivered");
      }
    };

    // Update immediately
    updateStatus();

    // Update every second
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, [order]);

  if (!order) return null;

  const statusSteps: { status: OrderStatus; label: string; icon: any }[] = [
    { status: "pending", label: "Aguardando", icon: Clock },
    { status: "confirmed", label: "Pedido Confirmado", icon: CheckCircle2 },
    { status: "preparing", label: "A Preparar", icon: Package },
    { status: "on-the-way", label: "A Caminho", icon: Truck },
    { status: "delivered", label: "Entregue", icon: CheckCircle2 },
  ];

  const currentStepIndex = statusSteps.findIndex((s) => s.status === currentStatus);
  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100;

  const getStatusMessage = () => {
    switch (currentStatus) {
      case "pending":
        return "O seu pedido está a ser processado. Aguarde a confirmação.";
      case "confirmed":
        return "O seu pedido foi confirmado e está a ser processado.";
      case "preparing":
        return "O nosso chef está a preparar a sua pizza com todo o cuidado!";
      case "on-the-way":
        return "A sua pizza está a caminho! Prepare-se para saborear.";
      case "delivered":
        return "Pedido entregue! Bom apetite!";
    }
  };

  const getEstimatedTime = () => {
    const elapsed = Math.floor(
      (new Date().getTime() - order.createdAt.getTime()) / 60000
    );
    const remaining = Math.max(0, order.estimatedTime - elapsed);
    return remaining;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rastreamento do Pedido #{order.id}</DialogTitle>
          <DialogDescription>
            Acompanhe o status do seu pedido em tempo real
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="text-center">
            <div className="text-2xl mb-2">
              {currentStatus === "delivered" ? "🎉" : "🍕"}
            </div>
            <p className="text-gray-700">{getStatusMessage()}</p>
            {currentStatus !== "delivered" && (
              <p className="mt-2 text-sm text-gray-600">
                Tempo estimado: <span className="font-bold">{getEstimatedTime()} minutos</span>
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-2" />

            <div className="grid grid-cols-5 gap-2">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.status} className="flex flex-col items-center">
                    <div
                      className={`rounded-full p-2 sm:p-3 mb-2 transition-colors ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-400"
                      } ${isCurrent ? "ring-4 ring-red-200" : ""}`}
                    >
                      <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <p
                      className={`text-xs text-center ${
                        isActive ? "font-medium text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="mb-3 text-sm">Histórico</h3>
            <div className="space-y-2 text-sm">
              {statusSteps.slice(0, currentStepIndex + 1).map((step, index) => (
                <div key={step.status} className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>
                    {new Date(
                      order.createdAt.getTime() + index * 8 * 60000
                    ).toLocaleTimeString("pt-PT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span>-</span>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              Alguma dúvida? Entre em contacto: <span className="font-medium">244 245 097</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}