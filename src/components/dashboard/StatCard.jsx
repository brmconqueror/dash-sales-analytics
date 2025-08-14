import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  color = "hsl(210, 100%, 55%)"
}) {
  return (
    <Card className="dashboard-card shadow-lg h-100 border-0" style={{
      background: 'var(--gradient-surface)', 
      borderLeft: `4px solid ${color}`,
      transition: 'var(--transition-smooth)',
      ':hover': { transform: 'translateY(-2px)' }
    }}>
      <CardHeader className="d-flex flex-row align-items-center justify-content-between pb-2" style={{paddingBottom: '0.5rem'}}>
        <CardTitle className="text-sm fw-medium text-muted mb-0">
          {title}
        </CardTitle>
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ 
            width: '2.5rem', 
            height: '2.5rem',
            background: `linear-gradient(135deg, ${color}20, ${color}10)`
          }}
        >
          <Icon 
            style={{ 
              width: '1.25rem', 
              height: '1.25rem',
              color 
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h2 fw-bold mb-1" style={{color: 'hsl(var(--primary))'}}>
          {typeof value === 'number' ? value.toLocaleString('tr-TR') : value}
        </div>
        {subtitle && (
          <p className="small text-muted mb-2">
            {subtitle}
          </p>
        )}
        {trend && (
          <div className={`small fw-medium d-flex align-items-center ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
            {trend.isPositive ? (
              <TrendingUp style={{width: '0.875rem', height: '0.875rem'}} className="me-1" />
            ) : (
              <TrendingDown style={{width: '0.875rem', height: '0.875rem'}} className="me-1" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}