import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getAllPerformanceMetrics,
  createPerformanceMetric,
  updatePerformanceMetric,
  deletePerformanceMetric
} from "../../services/performanceService";
import { getAllUsers } from "../../services/userService";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { FaChartLine } from "react-icons/fa";
import toast from "react-hot-toast";

function PerformancePage() {

  const [performanceMetrics, setPerformanceMetrics] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewPeriodFilter, setReviewPeriodFilter] = useState("All Periods");
  const [performanceFilter, setPerformanceFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newPerformance, setNewPerformance] = useState({
      userId: "",
      reviewPeriod: "",
      salesAmount: "",
      tasksCompleted: "",
      customerSatisfaction: "",
      performanceScore: ""
  });
  const [editingPerformance, setEditingPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingMetricId, setDeletingMetricId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const metricsPerPage = 5;

  const fetchPerformanceMetrics = async () => {
    setLoading(true);
    try {
       const performanceResponse = await getAllPerformanceMetrics();
       const usersResponse = await getAllUsers();

        setPerformanceMetrics(performanceResponse.data);
        setUsers(usersResponse.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
  };

  useEffect(() => {
      fetchPerformanceMetrics();

  }, []);

  const formatSalesAmount = (amount) => {
      return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0
      }).format(amount);
  };

  const getPerformanceBadgeClass = (score) => {
      if (score >= 90) {
          return "bg-green-100 text-green-700";
      }

      if (score >= 75) {
          return "bg-blue-100 text-blue-700";
      }

      if (score >= 60) {
          return "bg-yellow-100 text-yellow-700";
      }

      return "bg-red-100 text-red-700";
  };

  const matchesPerformanceFilter = (score) => {
      if (performanceFilter === "Excellent (90+)") {
          return score >= 90;
      }

      if (performanceFilter === "Good (75-89)") {
          return score >= 75 && score <= 89;
      }

      if (performanceFilter === "Average (60-74)") {
          return score >= 60 && score <= 74;
      }

      if (performanceFilter === "Needs Improvement (<60)") {
          return score < 60;
      }

      return true;
  };

  const filteredPerformanceMetrics = performanceMetrics.filter((metric) => {

      const keyword = searchTerm.toLowerCase();

      const matchesSearch = metric.employeeName.toLowerCase().includes(keyword);

      const matchesReviewPeriod =
          reviewPeriodFilter === "All Periods" ||
          metric.reviewPeriod === reviewPeriodFilter;

      return (
          matchesSearch &&
          matchesReviewPeriod &&
          matchesPerformanceFilter(metric.performanceScore)
      );

  });

  const totalPages = Math.ceil(filteredPerformanceMetrics.length / metricsPerPage);

  const startIndex = (currentPage - 1) * metricsPerPage;

  const paginatedPerformanceMetrics = filteredPerformanceMetrics.slice(
      startIndex,
      startIndex + metricsPerPage
  );

  useEffect(() => {
      setCurrentPage(1);

  }, [searchTerm, reviewPeriodFilter, performanceFilter]);

  useEffect(() => {
      if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
      }

  }, [currentPage, totalPages]);

  const buildPerformancePayload = () => {
      return {
          userId: Number(newPerformance.userId),
          reviewPeriod: newPerformance.reviewPeriod,
          salesAmount: Number(newPerformance.salesAmount),
          tasksCompleted: Number(newPerformance.tasksCompleted),
          customerSatisfaction: Number(newPerformance.customerSatisfaction),
          performanceScore: Number(newPerformance.performanceScore)
      };
  };

  const resetPerformanceForm = () => {
      setNewPerformance({
          userId: "",
          reviewPeriod: "",
          salesAmount: "",
          tasksCompleted: "",
          customerSatisfaction: "",
          performanceScore: ""
      });
  };

  const handleCreatePerformance = async () => {

      if (
          !newPerformance.userId ||
          !newPerformance.reviewPeriod ||
          newPerformance.salesAmount === "" ||
          newPerformance.tasksCompleted === "" ||
          newPerformance.customerSatisfaction === "" ||
          newPerformance.performanceScore === ""
      ) {
          toast.error("Please fill all fields.");
          return;
      }

      try {
          setSaving(true);

          await createPerformanceMetric(buildPerformancePayload());

          toast.success("Performance created successfully");

          resetPerformanceForm();

          setShowModal(false);

          fetchPerformanceMetrics();

      } catch (error) {

          console.error(error);

          toast.error(
              error.response?.data?.message ||
              "Failed to create performance."
          );

      } finally {
          setSaving(false);
      }

  };

  const handleUpdatePerformance = async () => {

      try {
          setSaving(true);

          await updatePerformanceMetric(
              editingPerformance.metricId,
              buildPerformancePayload()
          );

          toast.success("Performance updated successfully");

          setShowModal(false);

          setEditingPerformance(null);

          resetPerformanceForm();

          fetchPerformanceMetrics();

      } catch (error) {

          console.error(error);

          toast.error(
              error.response?.data?.message ||
              "Failed to update performance."
          );

      } finally {
          setSaving(false);
      }

  };

  const handleDeletePerformance = async () => {

        try {

            setDeletingMetricId(selectedPerformance.metricId);

            await deletePerformanceMetric(selectedPerformance.metricId);

            toast.success("Performance deleted successfully");

            fetchPerformanceMetrics();

            setShowDeleteModal(false);

            setSelectedPerformance(null);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete performance."
            );

        } finally {

            setDeletingMetricId(null);

        }

    };

  const handleEdit = (metric) => {

      setEditingPerformance(metric);

      setNewPerformance({
          userId: metric.userId,
          reviewPeriod: metric.reviewPeriod,
          salesAmount: metric.salesAmount,
          tasksCompleted: metric.tasksCompleted,
          customerSatisfaction: metric.customerSatisfaction,
          performanceScore: metric.performanceScore
      });

      setShowModal(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Page Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Performance Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage employee performance metrics and evaluations.
          </p>

        </div>

      </div>

      {/* Toolbar */}

      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">

        <button
            onClick={() => {

              setEditingPerformance(null);

              resetPerformanceForm();

              setShowModal(true);
          }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
            + Add Performance
        </button>

        <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Filters */}

      <div className="mt-4 flex flex-col md:flex-row gap-4">

          <select
              value={reviewPeriodFilter}
              onChange={(e) => setReviewPeriodFilter(e.target.value)}
              className="border border-slate-300 rounded-xl px-4 py-3 w-full md:w-64 outline-none focus:ring-2 focus:ring-blue-500"
          >
              <option>All Periods</option>
              <option>Q1 2026</option>
              <option>Q2 2026</option>
              <option>Q3 2026</option>
              <option>Q4 2026</option>
          </select>

          <select
              value={performanceFilter}
              onChange={(e) => setPerformanceFilter(e.target.value)}
              className="border border-slate-300 rounded-xl px-4 py-3 w-full md:w-72 outline-none focus:ring-2 focus:ring-blue-500"
          >
              <option>All</option>
              <option>Excellent (90+)</option>
              <option>Good (75-89)</option>
              <option>Average (60-74)</option>
              <option>Needs Improvement (&lt;60)</option>
          </select>

      </div>

      {/* Performance Table */}

      <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="px-6 py-4">Employee</th>

              <th className="px-6 py-4">Review Period</th>

              <th className="px-6 py-4">Sales Amount</th>

              <th className="px-6 py-4">Tasks Completed</th>

              <th className="px-6 py-4">Customer Satisfaction</th>

              <th className="px-6 py-4">Performance Score</th>

              <th className="px-6 py-4">Actions</th>

            </tr>

          </thead>

          <tbody>

          {
              filteredPerformanceMetrics.length === 0 ? (

                  <tr>

                    <td colSpan="7" className="py-16">

                        <div className="flex flex-col items-center">

                            <div className="text-6xl">
                                <div className="bg-slate-100 rounded-full p-6">
                                    <FaChartLine className="text-5xl text-slate-400" />
                                </div>
                            </div>

                            <h2 className="mt-4 text-2xl font-semibold text-slate-700">
                                No Performance Records Found
                            </h2>

                            <p className="mt-2 text-slate-500">
                                There are no performance records to display.
                            </p>

                            <p className="text-slate-500">
                                Click
                                <span className="font-semibold text-blue-600">
                                    {" "}+ Add Performance{" "}
                                </span>
                                to create one.
                            </p>

                        </div>

                    </td>

                  </tr>

              ) : (

                  paginatedPerformanceMetrics.map((metric) => (

                      <tr
                          key={metric.metricId}
                          className="border-t hover:bg-slate-50 transition"
                      >

                          <td className="px-6 py-4">
                              {metric.employeeName}
                          </td>

                          <td className="px-6 py-4">
                              {metric.reviewPeriod}
                          </td>

                          <td className="px-6 py-4">
                              {formatSalesAmount(metric.salesAmount)}
                          </td>

                          <td className="px-6 py-4">
                              {metric.tasksCompleted}
                          </td>

                          <td className="px-6 py-4">
                              {metric.customerSatisfaction} / 5
                          </td>

                          <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full font-semibold ${getPerformanceBadgeClass(metric.performanceScore)}`}>
                                  {metric.performanceScore}
                              </span>
                          </td>

                          <td className="px-6 py-4">

                              <button
                                  onClick={() => handleEdit(metric)}
                                  className="text-blue-600 hover:underline mr-4"
                              >
                                  Edit
                              </button>

                              <button
                                  onClick={() => {

                                      setSelectedPerformance(metric);

                                      setShowDeleteModal(true);

                                  }}
                                  disabled={deletingMetricId === metric.metricId}
                                  className={`hover:underline ${
                                      deletingMetricId === metric.metricId
                                          ? "text-red-300 cursor-not-allowed"
                                          : "text-red-600"
                                  }`}
                              >
                                  {
                                      deletingMetricId === metric.metricId
                                          ? "Deleting..."
                                          : "Delete"
                                  }
                              </button>

                          </td>

                      </tr>

                  ))

              )
          }

          </tbody>

        </table>

        </div>

      </div>

      {
          filteredPerformanceMetrics.length > 0 && (

              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">

                  <p className="text-slate-500">
                      Page {currentPage} of {totalPages}
                  </p>

                  <div className="flex gap-3">

                      <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition"
                      >
                          Previous
                      </button>

                      <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition"
                      >
                          Next
                      </button>

                  </div>

              </div>

          )
      }

      {
      showModal && (

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8">

              <h2 className="text-2xl font-bold text-slate-800">
                  {editingPerformance ? "Edit Performance" : "Add New Performance"}
              </h2>

              <p className="text-slate-500 mt-2">
                  {
                      editingPerformance
                          ? "Update employee performance information."
                          : "Create a new performance record."
                  }
              </p>

              <div className="mt-6 space-y-4">

                  <select
                      value={newPerformance.userId}
                      onChange={(e) =>
                          setNewPerformance({
                              ...newPerformance,
                              userId: Number(e.target.value)
                          })
                      }
                      className="w-full border rounded-xl px-4 py-3"
                  >
                      <option value="">Select Employee</option>

                      {
                          users.map((user) => (

                              <option
                                  key={user.userId}
                                  value={user.userId}
                              >
                                  {user.fullName}
                              </option>

                          ))
                      }
                  </select>

                  <input
                      type="text"
                      value={newPerformance.reviewPeriod}
                      onChange={(e) =>
                          setNewPerformance({
                              ...newPerformance,
                              reviewPeriod: e.target.value
                          })
                      }
                      placeholder="Review Period"
                      className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                      type="number"
                      value={newPerformance.salesAmount}
                      onChange={(e) =>
                          setNewPerformance({
                              ...newPerformance,
                              salesAmount: e.target.value
                          })
                      }
                      placeholder="Sales Amount"
                      className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                      type="number"
                      value={newPerformance.tasksCompleted}
                      onChange={(e) =>
                          setNewPerformance({
                              ...newPerformance,
                              tasksCompleted: e.target.value
                          })
                      }
                      placeholder="Tasks Completed"
                      className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                      type="number"
                      step="0.1"
                      value={newPerformance.customerSatisfaction}
                      onChange={(e) =>
                          setNewPerformance({
                              ...newPerformance,
                              customerSatisfaction: e.target.value
                          })
                      }
                      placeholder="Customer Satisfaction"
                      className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                      type="number"
                      value={newPerformance.performanceScore}
                      onChange={(e) =>
                          setNewPerformance({
                              ...newPerformance,
                              performanceScore: e.target.value
                          })
                      }
                      placeholder="Performance Score"
                      className="w-full border rounded-xl px-4 py-3"
                  />

              </div>

              <div className="flex justify-end gap-4 mt-8">

                  <button
                      onClick={() => {
                        setShowModal(false);

                        setEditingPerformance(null);

                      }}
                      className="px-6 py-3 rounded-xl border"
                  >
                      Cancel
                  </button>

                  <button
                      disabled={saving}
                      onClick={editingPerformance ? handleUpdatePerformance : handleCreatePerformance}
                      className={`px-6 py-3 rounded-xl text-white transition ${
                          saving
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                      {
                          saving
                              ? (editingPerformance ? "Updating..." : "Saving...")
                              : (editingPerformance ? "Update Performance" : "Save Performance")
                      }
                  </button>
              </div>

          </div>

      </div>

      )
      }
      {
      showDeleteModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

                <div className="text-center">

                    <div className="text-6xl">
                        !
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-slate-800">
                        Delete Performance
                    </h2>

                    <p className="mt-4 text-slate-500">

                        Are you sure you want to delete performance record for

                        <span className="font-semibold text-slate-800">
                            {" "}
                            {selectedPerformance?.employeeName}
                        </span>

                        ?

                    </p>

                    <p className="text-red-500 mt-2">
                        This action cannot be undone.
                    </p>

                </div>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={() => {

                            setShowDeleteModal(false);

                            setSelectedPerformance(null);

                        }}
                        className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDeletePerformance}
                        disabled={deletingMetricId !== null}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-xl transition"
                    >
                        {
                            deletingMetricId
                                ? "Deleting..."
                                : "Delete Performance"
                        }
                    </button>

                </div>

            </div>

        </div>

        )
        }
    </DashboardLayout>
  );
}

export default PerformancePage;
