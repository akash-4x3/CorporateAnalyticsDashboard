import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../../services/departmentService";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { FaBuilding } from "react-icons/fa";
import toast from "react-hot-toast";

function DepartmentsPage() {

  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
      departmentName: ""
  });
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const departmentsPerPage = 5;

  const fetchDepartments = async () => {
    setLoading(true);
    try {
       const response = await getAllDepartments();
        setDepartments(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
  };

  useEffect(() => {
      fetchDepartments();

  }, []);

  const filteredDepartments = departments.filter((department) => {

      const keyword = searchTerm.toLowerCase();

      return department.departmentName.toLowerCase().includes(keyword);

  });

  const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);

  const startIndex = (currentPage - 1) * departmentsPerPage;

  const paginatedDepartments = filteredDepartments.slice(
      startIndex,
      startIndex + departmentsPerPage
  );

  useEffect(() => {
      setCurrentPage(1);

  }, [searchTerm]);

  useEffect(() => {
      if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
      }

  }, [currentPage, totalPages]);

  const handleCreateDepartment = async () => {

      if (!newDepartment.departmentName) {
          toast.error("Please fill all fields.");
          return;
      }

      try {
          setSaving(true);

          await createDepartment(newDepartment);

          toast.success("Department created successfully");

          setNewDepartment({
              departmentName: ""
          });

          setShowModal(false);

          fetchDepartments();

      } catch (error) {

          console.error(error);

          toast.error(
              error.response?.data?.message ||
              "Failed to create department."
          );

      } finally {
          setSaving(false);
      }

  };

  const handleUpdateDepartment = async () => {

      try {
          setSaving(true);

          await updateDepartment(
              editingDepartment.departmentId,
              newDepartment
          );

          toast.success("Department updated successfully");

          setShowModal(false);

          setEditingDepartment(null);

          setNewDepartment({
              departmentName: ""
          });

          fetchDepartments();

      } catch (error) {

          console.error(error);

          toast.error(
              error.response?.data?.message ||
              "Failed to update department."
          );

      } finally {
          setSaving(false);
      }

  };

  const handleDeleteDepartment = async () => {

        try {

            setDeletingDepartmentId(selectedDepartment.departmentId);

            await deleteDepartment(selectedDepartment.departmentId);

            toast.success("Department deleted successfully");

            fetchDepartments();

            setShowDeleteModal(false);

            setSelectedDepartment(null);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete department."
            );

        } finally {

            setDeletingDepartmentId(null);

        }

    };

  const handleEdit = (department) => {

      setEditingDepartment(department);

      setNewDepartment({
          departmentName: department.departmentName
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
            Department Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage company departments.
          </p>

        </div>

      </div>

      {/* Toolbar */}

      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">

        <button
            onClick={() => {

              setEditingDepartment(null);

              setNewDepartment({
                  departmentName: ""
              });

              setShowModal(true);
          }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
            + Add Department
        </button>

        <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Departments Table */}

      <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="px-6 py-4">Department Name</th>

              <th className="px-6 py-4">Actions</th>

            </tr>

          </thead>

          <tbody>

          {
              filteredDepartments.length === 0 ? (

                  <tr>

                    <td colSpan="2" className="py-16">

                        <div className="flex flex-col items-center">

                            <div className="text-6xl">
                                <div className="bg-slate-100 rounded-full p-6">
                                    <FaBuilding className="text-5xl text-slate-400" />
                                </div>
                            </div>

                            <h2 className="mt-4 text-2xl font-semibold text-slate-700">
                                No Departments Found
                            </h2>

                            <p className="mt-2 text-slate-500">
                                There are no departments to display.
                            </p>

                            <p className="text-slate-500">
                                Click
                                <span className="font-semibold text-blue-600">
                                    {" "}+ Add Department{" "}
                                </span>
                                to create one.
                            </p>

                        </div>

                    </td>

                  </tr>

              ) : (

                  paginatedDepartments.map((department) => (

                      <tr
                          key={department.departmentId}
                          className="border-t hover:bg-slate-50 transition"
                      >

                          <td className="px-6 py-4">
                              {department.departmentName}
                          </td>

                          <td className="px-6 py-4">

                              <button
                                  onClick={() => handleEdit(department)}
                                  className="text-blue-600 hover:underline mr-4"
                              >
                                  Edit
                              </button>

                              <button
                                  onClick={() => {

                                      setSelectedDepartment(department);

                                      setShowDeleteModal(true);

                                  }}
                                  disabled={deletingDepartmentId === department.departmentId}
                                  className={`hover:underline ${
                                      deletingDepartmentId === department.departmentId
                                          ? "text-red-300 cursor-not-allowed"
                                          : "text-red-600"
                                  }`}
                              >
                                  {
                                      deletingDepartmentId === department.departmentId
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

      {
          filteredDepartments.length > 0 && (

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
                  {editingDepartment ? "Edit Department" : "Add New Department"}
              </h2>

              <p className="text-slate-500 mt-2">
                  {
                      editingDepartment
                          ? "Update department information."
                          : "Create a new company department."
                  }
              </p>

              <div className="mt-6 space-y-4">

                  <input
                      type="text"
                      value={newDepartment.departmentName}
                      onChange={(e) =>
                          setNewDepartment({
                              ...newDepartment,
                              departmentName: e.target.value
                          })
                      }
                      placeholder="Department Name"
                      className="w-full border rounded-xl px-4 py-3"
                  />

              </div>

              <div className="flex justify-end gap-4 mt-8">

                  <button
                      onClick={() => {
                        setShowModal(false);

                        setEditingDepartment(null);

                      }}
                      className="px-6 py-3 rounded-xl border"
                  >
                      Cancel
                  </button>

                  <button
                      disabled={saving}
                      onClick={editingDepartment ? handleUpdateDepartment : handleCreateDepartment}
                      className={`px-6 py-3 rounded-xl text-white transition ${
                          saving
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                      {
                          saving
                              ? (editingDepartment ? "Updating..." : "Saving...")
                              : (editingDepartment ? "Update Department" : "Save Department")
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
                        ⚠️
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-slate-800">
                        Delete Department
                    </h2>

                    <p className="mt-4 text-slate-500">

                        Are you sure you want to delete

                        <span className="font-semibold text-slate-800">
                            {" "}
                            {selectedDepartment?.departmentName}
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

                            setSelectedDepartment(null);

                        }}
                        className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDeleteDepartment}
                        disabled={deletingDepartmentId !== null}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-xl transition"
                    >
                        {
                            deletingDepartmentId
                                ? "Deleting..."
                                : "Delete Department"
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

export default DepartmentsPage;
