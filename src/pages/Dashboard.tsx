import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleChart, ChartData } from "@/components/charts/SimpleChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { DateRangeFilter } from "@/components/filters/DateRangeFilter";
import { DollarSign, Users, ShoppingBag, TrendingUp, BarChart3, LineChart } from "lucide-react";

export default function Dashboard() {
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  
  // Mock data - replace with API calls
  const salesData: ChartData[] = [
    { name: "Ocak", value: 45000 },
    { name: "Şubat", value: 52000 },
    { name: "Mart", value: 48000 },
    { name: "Nisan", value: 61000 },
    { name: "Mayıs", value: 55000 },
    { name: "Haziran", value: 67000 },
  ];

  const handleDateChange = (dateRange: any) => {
    console.log("Date range changed:", dateRange);
    // Here you would make API call with date range
  };

  const handleFilterChange = () => {
    // Handle filter changes and make API calls
    console.log("Filters changed");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Satış verilerinizi analiz edin</p>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="filter-bar">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tarih Aralığı</label>
              <DateRangeFilter onDateChange={handleDateChange} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tesis</label>
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Tesis seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Tesisler</SelectItem>
                  <SelectItem value="ankara">Ankara Şubesi</SelectItem>
                  <SelectItem value="istanbul">İstanbul Şubesi</SelectItem>
                  <SelectItem value="izmir">İzmir Şubesi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Müşteri</label>
              <Input 
                placeholder="Müşteri ara..." 
                className="w-[200px]"
                onChange={handleFilterChange}
              />
            </div>

            <Button 
              onClick={handleFilterChange}
              className="bg-primary hover:bg-primary-glow"
            >
              Filtrele
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Toplam Satış"
          value="₺2,847,350"
          subtitle="Bu ay"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          color="hsl(142, 69%, 58%)"
        />
        <StatCard
          title="Toplam Sipariş"
          value="1,247"
          subtitle="Bu ay"
          icon={ShoppingBag}
          trend={{ value: 8.2, isPositive: true }}
          color="hsl(217, 92%, 55%)"
        />
        <StatCard
          title="Aktif Müşteri"
          value="342"
          subtitle="Bu ay"
          icon={Users}
          trend={{ value: 3.1, isPositive: false }}
          color="hsl(38, 92%, 50%)"
        />
        <StatCard
          title="Ortalama Sipariş"
          value="₺2,284"
          subtitle="Bu ay"
          icon={TrendingUp}
          trend={{ value: 5.7, isPositive: true }}
          color="hsl(0, 84%, 60%)"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Satış Analizi</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("line")}
                >
                  <LineChart className="w-4 h-4" />
                </Button>
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SimpleChart 
              data={salesData} 
              type={chartType}
              height={300}
              dataKey="value"
            />
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>En İyi Müşteriler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "ABC Ticaret Ltd.", amount: "₺125,450", change: "+12%" },
                { name: "XYZ İnşaat A.Ş.", amount: "₺98,750", change: "+8%" },
                { name: "DEF Gıda San.", amount: "₺87,320", change: "+15%" },
                { name: "GHI Tekstil", amount: "₺76,890", change: "+5%" },
                { name: "JKL Otomotiv", amount: "₺65,430", change: "+9%" },
              ].map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.amount}</p>
                  </div>
                  <div className="text-success text-sm font-medium">
                    {customer.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}