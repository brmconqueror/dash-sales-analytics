import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DateRangeFilter } from "@/components/filters/DateRangeFilter";
import { Eye, Search } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  facility: string;
  date: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
}

export default function Orders() {
  const [orders] = useState<Order[]>([
    { id: "1", orderNumber: "SIP-2024-001", customer: "ABC Ticaret Ltd.", facility: "Ankara Şubesi", date: "2024-01-15", amount: 15750, status: "completed" },
    { id: "2", orderNumber: "SIP-2024-002", customer: "XYZ İnşaat A.Ş.", facility: "İstanbul Şubesi", date: "2024-01-16", amount: 28950, status: "pending" },
    { id: "3", orderNumber: "SIP-2024-003", customer: "DEF Gıda San.", facility: "İzmir Şubesi", date: "2024-01-17", amount: 12450, status: "completed" },
    { id: "4", orderNumber: "SIP-2024-004", customer: "GHI Tekstil", facility: "Ankara Şubesi", date: "2024-01-18", amount: 35200, status: "pending" },
    { id: "5", orderNumber: "SIP-2024-005", customer: "JKL Otomotiv", facility: "İstanbul Şubesi", date: "2024-01-19", amount: 19800, status: "cancelled" },
  ]);

  const [filters, setFilters] = useState({
    facility: "",
    orderNumber: "",
    customer: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Tamamlandı";
      case "pending": return "Beklemede";
      case "cancelled": return "İptal";
      default: return status;
    }
  };

  const handleFilterChange = () => {
    // Apply filters and make API call
    console.log("Filters applied:", filters);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Siparişler</h1>
          <p className="text-muted-foreground">Tüm siparişlerinizi yönetin</p>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="filter-bar">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tarih Aralığı</label>
              <DateRangeFilter onDateChange={handleFilterChange} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tesis</label>
              <Select value={filters.facility} onValueChange={(value) => setFilters({...filters, facility: value})}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Tesis seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tüm Tesisler</SelectItem>
                  <SelectItem value="ankara">Ankara Şubesi</SelectItem>
                  <SelectItem value="istanbul">İstanbul Şubesi</SelectItem>
                  <SelectItem value="izmir">İzmir Şubesi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sipariş No</label>
              <Input 
                placeholder="Sipariş no ara..." 
                className="w-[200px]"
                value={filters.orderNumber}
                onChange={(e) => setFilters({...filters, orderNumber: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Müşteri</label>
              <Input 
                placeholder="Müşteri ara..." 
                className="w-[200px]"
                value={filters.customer}
                onChange={(e) => setFilters({...filters, customer: e.target.value})}
              />
            </div>

            <Button 
              onClick={handleFilterChange}
              className="bg-primary hover:bg-primary-glow"
            >
              <Search className="w-4 h-4 mr-2" />
              Ara
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Sipariş Listesi ({orders.length} sipariş)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sipariş No</TableHead>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Tesis</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.facility}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString('tr-TR')}</TableCell>
                    <TableCell>₺{order.amount.toLocaleString('tr-TR')}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}