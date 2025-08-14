import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MapPin, Phone, Mail, Calendar, DollarSign } from "lucide-react";

interface Customer {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalAmount: number;
  lastOrderDate: string;
  status: "active" | "inactive";
}

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      code: "MUS-001",
      name: "ABC Ticaret Ltd. Şti.",
      email: "info@abcticaret.com",
      phone: "+90 212 555 0101",
      city: "İstanbul",
      totalOrders: 45,
      totalAmount: 567890,
      lastOrderDate: "2024-01-15",
      status: "active"
    },
    {
      id: "2",
      code: "MUS-002",
      name: "XYZ İnşaat A.Ş.",
      email: "siparis@xyzinsaat.com",
      phone: "+90 312 555 0202",
      city: "Ankara",
      totalOrders: 32,
      totalAmount: 423150,
      lastOrderDate: "2024-01-12",
      status: "active"
    },
    {
      id: "3",
      code: "MUS-003",
      name: "DEF Gıda Sanayi",
      email: "contact@defgida.com",
      phone: "+90 232 555 0303",
      city: "İzmir",
      totalOrders: 28,
      totalAmount: 298760,
      lastOrderDate: "2024-01-10",
      status: "inactive"
    },
    {
      id: "4",
      code: "MUS-004",
      name: "GHI Tekstil Ltd.",
      email: "info@ghitextile.com",
      phone: "+90 216 555 0404",
      city: "İstanbul",
      totalOrders: 67,
      totalAmount: 789320,
      lastOrderDate: "2024-01-18",
      status: "active"
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Müşteriler</h1>
          <p className="text-muted-foreground">Müşteri bilgilerini yönetin</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="filter-bar">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Müşteri adı veya kodu ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredCustomers.length} müşteri bulundu
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <Dialog key={customer.id}>
            <DialogTrigger asChild>
              <Card className="dashboard-card cursor-pointer hover:scale-105 transition-transform">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{customer.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{customer.code}</p>
                    </div>
                    <Badge 
                      className={customer.status === 'active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                    >
                      {customer.status === 'active' ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {customer.city}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
                      <p className="font-semibold">{customer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Toplam Tutar</p>
                      <p className="font-semibold">₺{customer.totalAmount.toLocaleString('tr-TR')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {customer.name}
                  <Badge 
                    className={customer.status === 'active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                  >
                    {customer.status === 'active' ? 'Aktif' : 'Pasif'}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">İletişim Bilgileri</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{customer.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <p className="font-medium">{customer.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Şehir</p>
                        <p className="font-medium">{customer.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Satış İstatistikleri</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Toplam Satış</p>
                        <p className="font-medium">₺{customer.totalAmount.toLocaleString('tr-TR')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-warning">{customer.totalOrders}</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
                        <p className="font-medium">{customer.totalOrders} adet</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Son Sipariş</p>
                        <p className="font-medium">{new Date(customer.lastOrderDate).toLocaleDateString('tr-TR')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}