import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleChart, ChartData } from "@/components/charts/SimpleChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { Calendar, TrendingUp, Users, Building, Download } from "lucide-react";

export default function Reports() {
  const [reportType, setReportType] = useState("monthly");
  const [department, setDepartment] = useState("all");

  // Mock data for different report types
  const monthlyData: ChartData[] = [
    { name: "Ocak", value: 450000, orders: 120 },
    { name: "Şubat", value: 520000, orders: 145 },
    { name: "Mart", value: 480000, orders: 132 },
    { name: "Nisan", value: 610000, orders: 168 },
    { name: "Mayıs", value: 550000, orders: 155 },
    { name: "Haziran", value: 670000, orders: 189 },
  ];

  const weeklyData: ChartData[] = [
    { name: "1. Hafta", value: 125000 },
    { name: "2. Hafta", value: 142000 },
    { name: "3. Hafta", value: 138000 },
    { name: "4. Hafta", value: 165000 },
  ];

  const yearlyData: ChartData[] = [
    { name: "2020", value: 4200000 },
    { name: "2021", value: 4850000 },
    { name: "2022", value: 5200000 },
    { name: "2023", value: 5890000 },
    { name: "2024", value: 6750000 },
  ];

  const departmentData: ChartData[] = [
    { name: "Satış", value: 2847000 },
    { name: "Pazarlama", value: 1250000 },
    { name: "Müşteri Hizm.", value: 890000 },
    { name: "İç Satış", value: 1580000 },
    { name: "Teknik", value: 450000 },
  ];

  const getChartData = () => {
    switch (reportType) {
      case "weekly": return weeklyData;
      case "yearly": return yearlyData;
      case "department": return departmentData;
      default: return monthlyData;
    }
  };

  const getReportTitle = () => {
    switch (reportType) {
      case "weekly": return "Haftalık Satış Raporu";
      case "yearly": return "Yıllık Satış Raporu";
      case "department": return "Departman Performans Raporu";
      default: return "Aylık Satış Raporu";
    }
  };

  const handleExportReport = () => {
    // Handle report export
    console.log("Exporting report:", reportType, department);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Raporlar</h1>
          <p className="text-muted-foreground">Detaylı satış analizi ve raporları</p>
        </div>
        <Button onClick={handleExportReport} className="bg-primary hover:bg-primary-glow">
          <Download className="w-4 h-4 mr-2" />
          Rapor İndir
        </Button>
      </div>

      {/* Report Controls */}
      <Card className="filter-bar">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rapor Türü</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Aylık Satış</SelectItem>
                  <SelectItem value="weekly">Haftalık Satış</SelectItem>
                  <SelectItem value="yearly">Yıllık Satış</SelectItem>
                  <SelectItem value="department">Departman Performansı</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reportType === "department" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Departman</label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Departmanlar</SelectItem>
                    <SelectItem value="sales">Satış</SelectItem>
                    <SelectItem value="marketing">Pazarlama</SelectItem>
                    <SelectItem value="support">Müşteri Hizmetleri</SelectItem>
                    <SelectItem value="internal">İç Satış</SelectItem>
                    <SelectItem value="technical">Teknik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Bu Ay Toplam"
          value="₺2,847,350"
          subtitle="Önceki aya göre"
          icon={TrendingUp}
          trend={{ value: 12.5, isPositive: true }}
          color="hsl(142, 69%, 58%)"
        />
        <StatCard
          title="Ortalama Günlük"
          value="₺94,912"
          subtitle="Son 30 gün"
          icon={Calendar}
          trend={{ value: 8.3, isPositive: true }}
          color="hsl(217, 92%, 55%)"
        />
        <StatCard
          title="En İyi Departman"
          value="Satış"
          subtitle="₺2,847,350"
          icon={Building}
          color="hsl(38, 92%, 50%)"
        />
        <StatCard
          title="Aktif Temsilci"
          value="24"
          subtitle="Bu ay satış yapan"
          icon={Users}
          trend={{ value: 4.2, isPositive: true }}
          color="hsl(0, 84%, 60%)"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Report Chart */}
        <Card className="dashboard-card lg:col-span-2">
          <CardHeader>
            <CardTitle>{getReportTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart 
              data={getChartData()} 
              type="line"
              height={400}
              dataKey="value"
            />
          </CardContent>
        </Card>

        {/* Performance by Department */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Departman Performansı</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart 
              data={departmentData} 
              type="bar"
              height={300}
              dataKey="value"
              color="hsl(38, 92%, 50%)"
            />
          </CardContent>
        </Card>

        {/* Top Performing Metrics */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Performans Metrikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                <div>
                  <p className="font-medium">Ortalama Sipariş Değeri</p>
                  <p className="text-sm text-muted-foreground">Son 30 gün</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">₺2,284</p>
                  <p className="text-success text-sm">+5.7%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                <div>
                  <p className="font-medium">Müşteri Başına Satış</p>
                  <p className="text-sm text-muted-foreground">Bu ay</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">₺8,325</p>
                  <p className="text-success text-sm">+12.3%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                <div>
                  <p className="font-medium">Tekrar Sipariş Oranı</p>
                  <p className="text-sm text-muted-foreground">Bu çeyrek</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">68%</p>
                  <p className="text-success text-sm">+3.2%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                <div>
                  <p className="font-medium">Hedef Tamamlama</p>
                  <p className="text-sm text-muted-foreground">Bu ay</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">84%</p>
                  <p className="text-warning text-sm">-2.1%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}