import { PRO_URL } from "@/lib/nav";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { buttonClass } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { MrrChart } from "@/components/charts/mrr-chart";
import { TrafficChart } from "@/components/charts/traffic-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { getCustomers, getDailyTraffic, getKpis, getMonthlySeries, getRecentActivity, getTrafficSources } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const activityDot = { upgrade: "bg-success", trial: "bg-brand", failed: "bg-warning", churn: "bg-danger" } as const;

export default function OverviewPage() {
  const kpis = getKpis();
  const series = getMonthlySeries();
  const topCustomers = [...getCustomers()].sort((a, b) => b.mrr - a.mrr).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Overview"
        description="How your business is doing this month."
        actions={
          <>
            <a href={PRO_URL} target="_blank" rel="noopener" className={buttonClass("secondary")}>
              Get Pulse Pro
            </a>
            <button className={buttonClass("primary")}>
              <Download className="size-4" aria-hidden />
              Export report
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="MRR growth" description="Monthly recurring revenue, last 12 months" />
          <CardBody className="pt-2">
            <MrrChart data={series} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Traffic sources" description="Share of sign-ups, last 30 days" />
          <CardBody>
            <DonutChart data={getTrafficSources()} />
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Visitors and sign-ups" description="Daily, last 30 days" />
          <CardBody className="pt-2">
            <TrafficChart data={getDailyTraffic()} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent activity" />
          <CardBody>
            <ul className="space-y-4">
              {getRecentActivity().map((a) => (
                <li key={a.id} className="flex items-start gap-3 text-sm">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${activityDot[a.type]}`} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p>
                      <span className="font-medium">{a.who}</span> <span className="text-muted">{a.what}</span>
                    </p>
                    <p className="text-xs text-muted">{a.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Top customers"
          description="By monthly recurring revenue"
          action={
            <a href={PRO_URL} target="_blank" rel="noopener" className="text-sm font-medium text-brand hover:underline">
              Full table in Pro
            </a>
          }
        />
        <div className="overflow-x-auto p-2 pt-3">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Company</th>
                <th className="px-3 py-2 font-medium">Plan</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 text-right font-medium">MRR</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {topCustomers.map((c) => (
                <tr key={c.id}>
                  <td className="px-3 py-3">
                    <div className="font-medium">{c.company}</div>
                    <div className="text-xs text-muted">{c.name}</div>
                  </td>
                  <td className="px-3 py-3">{c.plan}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-3 py-3 text-right font-medium tabular-nums">{formatCurrency(c.mrr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
