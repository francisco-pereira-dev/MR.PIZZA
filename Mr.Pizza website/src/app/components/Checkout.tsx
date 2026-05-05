import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { DeliveryType, Store } from "../types";
import { stores } from "../data/stores";
import { coupons } from "../data/coupons";
import { MapPin, Store as StoreIcon, Clock, Tag, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
  subtotal: number;
  deliveryFee: number;
  onConfirm: (data: CheckoutData) => void;
}

export interface CheckoutData {
  name: string;
  phone: string;
  address: string;
  deliveryType: DeliveryType;
  selectedStore?: Store;
  paymentMethod: string;
  notes: string;
  scheduledTime?: string;
  scheduleType: "now" | "scheduled";
  couponCode?: string;
  discount: number;
}

export function Checkout({ open, onClose, subtotal, deliveryFee, onConfirm }: CheckoutProps) {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [selectedStore, setSelectedStore] = useState<Store | undefined>();
  const [scheduleType, setScheduleType] = useState<"now" | "scheduled">("now");
  const [scheduledTime, setScheduledTime] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);
  const [couponError, setCouponError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "card",
    notes: "",
  });

  const handleApplyCoupon = () => {
    setCouponError("");
    const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
    
    if (!coupon) {
      setCouponError("Cupão inválido");
      return;
    }
    
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      setCouponError(`Pedido mínimo de €${coupon.minOrder.toFixed(2)} necessário`);
      return;
    }
    
    setAppliedCoupon(coupon);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === "percentage") {
      return (subtotal * appliedCoupon.discount) / 100;
    } else {
      return appliedCoupon.discount;
    }
  };

  const discount = calculateDiscount();
  const finalDeliveryFee = deliveryType === "takeaway" ? 0 : deliveryFee;
  const total = subtotal - discount + finalDeliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (deliveryType === "takeaway" && !selectedStore) {
      alert("Por favor, selecione uma loja para levantamento");
      return;
    }
    
    onConfirm({
      ...formData,
      deliveryType,
      selectedStore,
      scheduleType,
      scheduledTime: scheduleType === "scheduled" ? scheduledTime : undefined,
      couponCode: appliedCoupon?.code,
      discount,
    });
  };

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Start from next hour
    let startHour = currentHour + 1;
    if (currentMinute > 30) startHour++;
    
    for (let hour = startHour; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 23) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    
    return slots;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
          <DialogDescription>
            Complete seus dados para finalizar o pedido
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Delivery Type Selection */}
          <div>
            <Label className="mb-3 block">Tipo de Pedido *</Label>
            <RadioGroup 
              value={deliveryType} 
              onValueChange={(v) => setDeliveryType(v as DeliveryType)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  htmlFor="delivery"
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryType === "delivery" ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="delivery" id="delivery" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="cursor-pointer flex items-center gap-2 font-semibold">
                        <MapPin className="h-4 w-4" />
                        Entrega ao Domicílio
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        30-40 minutos • Taxa: €{deliveryFee.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </label>
                
                <label
                  htmlFor="takeaway"
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryType === "takeaway" ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="takeaway" id="takeaway" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="cursor-pointer flex items-center gap-2 font-semibold">
                        <StoreIcon className="h-4 w-4" />
                        Levantamento na Loja
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        20-30 minutos • Sem taxa de entrega
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Store Selection for Takeaway */}
          {deliveryType === "takeaway" && (
            <div>
              <Label className="mb-3 block">Selecione a Loja *</Label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      selectedStore?.id === store.id ? "border-red-600 bg-red-50" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedStore(store)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{store.name}</h4>
                        <p className="text-xs text-gray-600">{store.address}, {store.city}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {store.openingHours}
                        </p>
                      </div>
                      {selectedStore?.id === store.id && (
                        <CheckCircle2 className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Type */}
          <div>
            <Label className="mb-3 block">Quando Deseja Receber? *</Label>
            <RadioGroup value={scheduleType} onValueChange={(v) => setScheduleType(v as "now" | "scheduled")}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="now" />
                  <Label htmlFor="now" className="cursor-pointer">
                    O mais rápido possível
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="cursor-pointer">
                    Agendar para mais tarde
                  </Label>
                </div>
              </div>
            </RadioGroup>
            
            {scheduleType === "scheduled" && (
              <div className="mt-3">
                <Select value={scheduledTime} onValueChange={setScheduledTime} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeSlots().map((time) => (
                      <SelectItem key={time} value={time}>
                        Hoje às {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <Label htmlFor="name" className="mb-2 block">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="João Silva"
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="phone" className="mb-2 block">Telefone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="+351 244 245 097"
                className="w-full"
              />
            </div>
          </div>

          {/* Address for Delivery */}
          {deliveryType === "delivery" && (
            <div>
              <Label htmlFor="address">Morada de Entrega *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                placeholder="Rua, número, andar, código postal, cidade"
                rows={3}
              />
            </div>
          )}

          {/* Coupon Code */}
          <div>
            <Label htmlFor="coupon" className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4" />
              Cupão de Desconto
            </Label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponError("");
                }}
                placeholder="Digite o código do cupão"
                disabled={!!appliedCoupon}
              />
              {!appliedCoupon ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode}
                >
                  Aplicar
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setAppliedCoupon(null);
                    setCouponCode("");
                  }}
                >
                  Remover
                </Button>
              )}
            </div>
            {couponError && (
              <p className="text-xs text-red-600 mt-1">{couponError}</p>
            )}
            {appliedCoupon && (
              <div className="mt-2 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-bold text-green-800">{appliedCoupon.description}</p>
                    <p className="text-xs text-green-700">
                      Código: <span className="font-mono bg-green-100 px-2 py-0.5 rounded">{appliedCoupon.code}</span>
                    </p>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    -{appliedCoupon.type === 'percentage' ? `${appliedCoupon.discount}%` : `€${appliedCoupon.discount}`}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <Label className="mb-3 block">Método de Pagamento *</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="cursor-pointer">
                  Cartão de Crédito/Débito
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="cursor-pointer">
                  Dinheiro {deliveryType === "delivery" ? "na Entrega" : "na Loja"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mbway" id="mbway" />
                <Label htmlFor="mbway" className="cursor-pointer">
                  MB WAY
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="mb-2 block">Notas (Opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Instruções especiais..."
              rows={2}
              className="w-full"
            />
          </div>

          {/* Order Summary */}
          <div className="rounded-lg bg-gray-50 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Desconto</span>
                <span>-€{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Taxa de {deliveryType === "delivery" ? "Entrega" : "Serviço"}</span>
              <span>€{finalDeliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="font-bold">Total a Pagar:</span>
              <span className="font-bold text-red-600 text-xl">
                €{total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Confirmar Pedido
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}