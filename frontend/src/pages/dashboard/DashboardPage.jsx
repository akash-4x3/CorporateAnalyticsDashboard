import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import { getDashboardSummary } from "../../services/dashboardService";
import TopPerformers from "../../components/dashboard/TopPerformers";
import { getTopPerformers } from "../../services/dashboardService";
import PerformanceTrendChart from "../../components/dashboard/PerformanceTrendChart";
import { getPerformanceTrend } from "../../services/dashboardService";
import LowPerformers from "../../components/dashboard/LowPerformers";
import { getLowPerformers } from "../../services/dashboardService";
function DashboardPage() {
    const [performers, setPerformers] = useState([]);
    const [lowPerformers, setLowPerformers] = useState([]);
    const [summary, setSummary] = useState(null);
    const [performanceTrend, setPerformanceTrend] = useState([]);


    useEffect(() => {

        const fetchDashboardSummary = async () => {
        try {
            const response = await getDashboardSummary();
            setSummary(response.data);
        }     catch (error) {
            console.error("Failed to fetch dashboard summary", error);
        }

        const performersResponse = await getTopPerformers();
        setPerformers(performersResponse.data);

        const trendResponse = await getPerformanceTrend();
        setPerformanceTrend(trendResponse.data);

        const lowPerformersResponse = await getLowPerformers();
        setLowPerformers(lowPerformersResponse.data);
    };

    fetchDashboardSummary();
    }, []);

    if (!summary) {
        return (
        <DashboardLayout>
            <h1 className="text-2xl font-semibold">
            Loading Dashboard...
            </h1>
        </DashboardLayout>
        );
    }

  return (
    <DashboardLayout>

      <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    Dashboard Overview
                </h1>

                <p className="text-slate-500 mt-1">
                    Welcome to the Corporate Analytics Dashboard.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <StatCard
                    title="Employees"
                    value={summary.totalEmployees}
                    color="text-blue-600"
                />

                <StatCard
                    title="Departments"
                    value={summary.totalDepartments}
                    color="text-green-600"
                />

                <StatCard
                    title="Average Score"
                    value={summary.averagePerformanceScore}
                    color="text-purple-600"
                />

                <StatCard
                    title="Sales"
                    value={`₹${summary.totalSales}`}
                    color="text-orange-600"
                />

            </div>

            <TopPerformers performers={performers} />
            <PerformanceTrendChart data={performanceTrend} />
            <LowPerformers performers={lowPerformers} />

        </div>
    </DashboardLayout>
  );
}

export default DashboardPage;