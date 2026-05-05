import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Clock, Package, CheckCircle2, Trash2 } from 'lucide-react';
import { Order } from './OrderTracking';

interface OrderHistoryProps {
  open: boolean;
  onClose: () => void;
  orders: Order[];
  onClearHistory: () => void;
}

export function OrderHistory({ open, onClose, orders, onClearHistory }: OrderHistoryProps) {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'preparing':
        return <Package className="h-5 w-5 text-orange-600" />;
      case 'on-the-way':
        return <Package className="h-5 w-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      confirmed: 'Confirmado',
      preparing: 'Em Preparação',
      'on-the-way': 'A Caminho',
      delivered: 'Entregue',
    };
    return labels[status];
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-700" />
            Histórico de Pedidos
          </DialogTitle>
          <DialogDescription>
            {orders.length > 0 
              ? `Você tem ${orders.length} ${orders.length === 1 ? 'pedido' : 'pedidos'} no histórico`
              : 'Você ainda não fez nenhum pedido'}
          </DialogDescription>
        </DialogHeader>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Clock className="h-16 w-16 mb-4 opacity-20" />
            <p>Seu histórico de pedidos aparecerá aqui!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mt-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(order.status)}
                        <span className="font-bold">Pedido #{order.id}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('pt-PT', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'delivered' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  {order.status === 'delivered' && (
                    <p className="text-sm text-gray-600">
                      ✅ Pedido concluído com sucesso
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={onClearHistory}
                className="w-full text-red-700 border-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Histórico
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
