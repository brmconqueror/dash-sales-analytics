import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function SimpleChart({ 
  data, 
  type, 
  height = 300, 
  dataKey = "value",
  color = "hsl(210, 100%, 55%)"
}) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded-lg p-3 shadow-lg" style={{
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.5rem'
        }}>
          <p className="fw-medium mb-1">{label}</p>
          <p className="text-primary mb-0">
            {payload[0].name}: ₺{payload[0].value?.toLocaleString('tr-TR')}
          </p>
        </div>
      );
    }
    return null;
  };

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(210, 100%, 55%)" />
              <stop offset="100%" stopColor="hsl(195, 100%, 65%)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            style={{ fontFamily: 'system-ui' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            style={{ fontFamily: 'system-ui' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ fill: "hsl(210, 100%, 55%)", strokeWidth: 2, r: 5 }}
            activeDot={{ 
              r: 7, 
              fill: "hsl(195, 100%, 65%)",
              stroke: "hsl(210, 100%, 55%)",
              strokeWidth: 2 
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(210, 100%, 55%)" />
            <stop offset="100%" stopColor="hsl(195, 100%, 65%)" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="name" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          style={{ fontFamily: 'system-ui' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          style={{ fontFamily: 'system-ui' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey={dataKey} 
          fill="url(#barGradient)"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}