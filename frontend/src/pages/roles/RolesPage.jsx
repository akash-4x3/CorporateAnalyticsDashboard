import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole
} from "../../services/roleService";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";

function RolesPage() {

  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState({
      roleName: ""
  });
  const [editingRole, setEditingRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingRoleId, setDeletingRoleId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rolesPerPage = 5;

  const fetchRoles = async () => {
    setLoading(true);
    try {
       const response = await getAllRoles();
        setRoles(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
  };

  useEffect(() => {
      fetchRoles();

  }, []);

  const filteredRoles = roles.filter((role) => {

      const keyword = searchTerm.toLowerCase();

      return role.roleName.toLowerCase().includes(keyword);

  });

  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const startIndex = (currentPage - 1) * rolesPerPage;

  const paginatedRoles = filteredRoles.slice(
      startIndex,
      startIndex + rolesPerPage
  );

  useEffect(() => {
      setCurrentPage(1);

  }, [searchTerm]);

  useEffect(() => {
      if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
      }

  }, [currentPage, totalPages]);

  const handleCreateRole = async () => {

      if (!newRole.roleName) {
          toast.error("Please fill all fields.");
          return;
      }

      try {
          setSaving(true);

          await createRole(newRole);

          toast.success("Role created successfully");

          setNewRole({
              roleName: ""
          });

          setShowModal(false);

          fetchRoles();

      } catch (error) {

          console.error(error);

          toast.error(
              error.response?.data?.message ||
              "Failed to create role."
          );

      } finally {
          setSaving(false);
      }

  };

  const handleUpdateRole = async () => {

      try {
          setSaving(true);

          await updateRole(
              editingRole.roleId,
              newRole
          );

          toast.success("Role updated successfully");

          setShowModal(false);

          setEditingRole(null);

          setNewRole({
              roleName: ""
          });

          fetchRoles();

      } catch (error) {

          console.error(error);

          toast.error(
              error.response?.data?.message ||
              "Failed to update role."
          );

      } finally {
          setSaving(false);
      }

  };

  const handleDeleteRole = async () => {

        try {

            setDeletingRoleId(selectedRole.roleId);

            await deleteRole(selectedRole.roleId);

            toast.success("Role deleted successfully");

            fetchRoles();

            setShowDeleteModal(false);

            setSelectedRole(null);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete role."
            );

        } finally {

            setDeletingRoleId(null);

        }

    };

  const handleEdit = (role) => {

      setEditingRole(role);

      setNewRole({
          roleName: role.roleName
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
            Role Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage application roles.
          </p>

        </div>

      </div>

      {/* Toolbar */}

      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">

        <button
            onClick={() => {

              setEditingRole(null);

              setNewRole({
                  roleName: ""
              });

              setShowModal(true);
          }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
            + Add Role
        </button>

        <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Roles Table */}

      <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="px-6 py-4">Role Name</th>

              <th className="px-6 py-4">Actions</th>

            </tr>

          </thead>

          <tbody>

          {
              filteredRoles.length === 0 ? (

                  <tr>

                    <td colSpan="2" className="py-16">

                        <div className="flex flex-col items-center">

                            <div className="text-6xl">
                                <div className="bg-slate-100 rounded-full p-6">
                                    <FaUserShield className="text-5xl text-slate-400" />
                                </div>
                            </div>

                            <h2 className="mt-4 text-2xl font-semibold text-slate-700">
                                No Roles Found
                            </h2>

                            <p className="mt-2 text-slate-500">
                                There are no roles to display.
                            </p>

                            <p className="text-slate-500">
                                Click
                                <span className="font-semibold text-blue-600">
                                    {" "}+ Add Role{" "}
                                </span>
                                to create one.
                            </p>

                        </div>

                    </td>

                  </tr>

              ) : (

                  paginatedRoles.map((role) => (

                      <tr
                          key={role.roleId}
                          className="border-t hover:bg-slate-50 transition"
                      >

                          <td className="px-6 py-4">
                              {role.roleName}
                          </td>

                          <td className="px-6 py-4">

                              <button
                                  onClick={() => handleEdit(role)}
                                  className="text-blue-600 hover:underline mr-4"
                              >
                                  Edit
                              </button>

                              <button
                                  onClick={() => {

                                      setSelectedRole(role);

                                      setShowDeleteModal(true);

                                  }}
                                  disabled={deletingRoleId === role.roleId}
                                  className={`hover:underline ${
                                      deletingRoleId === role.roleId
                                          ? "text-red-300 cursor-not-allowed"
                                          : "text-red-600"
                                  }`}
                              >
                                  {
                                      deletingRoleId === role.roleId
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
          filteredRoles.length > 0 && (

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
                  {editingRole ? "Edit Role" : "Add New Role"}
              </h2>

              <p className="text-slate-500 mt-2">
                  {
                      editingRole
                          ? "Update role information."
                          : "Create a new application role."
                  }
              </p>

              <div className="mt-6 space-y-4">

                  <input
                      type="text"
                      value={newRole.roleName}
                      onChange={(e) =>
                          setNewRole({
                              ...newRole,
                              roleName: e.target.value
                          })
                      }
                      placeholder="Role Name"
                      className="w-full border rounded-xl px-4 py-3"
                  />

              </div>

              <div className="flex justify-end gap-4 mt-8">

                  <button
                      onClick={() => {
                        setShowModal(false);

                        setEditingRole(null);

                      }}
                      className="px-6 py-3 rounded-xl border"
                  >
                      Cancel
                  </button>

                  <button
                      disabled={saving}
                      onClick={editingRole ? handleUpdateRole : handleCreateRole}
                      className={`px-6 py-3 rounded-xl text-white transition ${
                          saving
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                      {
                          saving
                              ? (editingRole ? "Updating..." : "Saving...")
                              : (editingRole ? "Update Role" : "Save Role")
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
                        Delete Role
                    </h2>

                    <p className="mt-4 text-slate-500">

                        Are you sure you want to delete

                        <span className="font-semibold text-slate-800">
                            {" "}
                            {selectedRole?.roleName}
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

                            setSelectedRole(null);

                        }}
                        className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDeleteRole}
                        disabled={deletingRoleId !== null}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-xl transition"
                    >
                        {
                            deletingRoleId
                                ? "Deleting..."
                                : "Delete Role"
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

export default RolesPage;
