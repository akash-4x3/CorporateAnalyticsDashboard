import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  getAllUsers, 
  createUser,
  updateUser,
  deleteUser
} from "../../services/userService";
import { useEffect, useState } from "react";
import { getAllRoles } from "../../services/roleService";
import { getAllDepartments } from "../../services/departmentService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";

function UsersPage() {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
      fullName: "",
      email: "",
      password: "",
      roleId: "",
      departmentId: ""
  });
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
       const response = await getAllUsers();
        setUsers(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
  };

  const fetchRoles = async () => {

      try {

          const response = await getAllRoles();
          console.log("Roles Response:", response);
          setRoles(response.data);

      } catch (error) {

          console.error(error);

      }

  };

  const fetchDepartments = async () => {

      try {

          const response = await getAllDepartments();
          console.log("Departments Response:", response);
          setDepartments(response.data);

      } catch (error) {

          console.error(error);

      }

  };

  useEffect(() => {
      fetchUsers();
      fetchRoles();
      fetchDepartments();

  }, []);

  const filteredUsers = users.filter((user) => {

      const keyword = searchTerm.toLowerCase();

      return (
          user.fullName.toLowerCase().includes(keyword) ||
          user.email.toLowerCase().includes(keyword) ||
          user.role.toLowerCase().includes(keyword) ||
          user.department.toLowerCase().includes(keyword)
      );

  });

  const handleCreateUser = async () => {

      if (
          !newUser.fullName ||
          !newUser.email ||
          !newUser.password ||
          !newUser.roleId ||
          !newUser.departmentId
      ) {
          alert("Please fill all fields.");
          return;
      }

      try {
          setSaving(true);

          const response = await createUser(newUser);

          toast.success(response.message);

          setNewUser({
              fullName: "",
              email: "",
              password: "",
              roleId: "",
              departmentId: ""
          });

          setShowModal(false);

          fetchUsers();

      } catch (error) {

          console.error(error);

          toast.error(
              error.response?.data?.message ||
              "Failed to create user."
          );

      } finally {
          setSaving(false);
      }

  };

  const handleUpdateUser = async () => {

      try {
          setSaving(true);

          const response = await updateUser(
              editingUser.userId,
              newUser
          );

          toast.success(response.message);

          setShowModal(false);

          setEditingUser(null);

          setNewUser({
              fullName: "",
              email: "",
              password: "",
              roleId: "",
              departmentId: ""
          });

          fetchUsers();

      } catch (error) {

          console.error(error);

          toast.error(
              error.response?.data?.message ||
              "Failed to update user."
          );

      } finally {
          setSaving(false);
      }

  };

  const handleDeleteUser = async () => {

        try {

            setDeletingUserId(selectedUser.userId);

            const response = await deleteUser(selectedUser.userId);

            toast.success(response.message);

            fetchUsers();

            setShowDeleteModal(false);

            setSelectedUser(null);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete user."
            );

        } finally {

            setDeletingUserId(null);

        }

    };

  const handleEdit = (user) => {

      const selectedRole = roles.find(
          role => role.roleName === user.role
      );

      const selectedDepartment = departments.find(
          department => department.departmentName === user.department
      );

      setEditingUser(user);

      setNewUser({
          fullName: user.fullName,
          email: user.email,
          password: "",
          roleId: selectedRole ? selectedRole.roleId : "",
          departmentId: selectedDepartment ? selectedDepartment.departmentId : ""
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
            User Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage employees across the organization.
          </p>

        </div>

      </div>

      {/* Toolbar */}

      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">

        <button
            onClick={() => {

              setEditingUser(null);

              setNewUser({
                  fullName: "",
                  email: "",
                  password: "",
                  roleId: "",
                  departmentId: ""
              });

              setShowModal(true);
          }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
            + Add User
        </button>

        <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Users Table */}

      <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="px-6 py-4">Name</th>

              <th className="px-6 py-4">Email</th>

              <th className="px-6 py-4">Role</th>

              <th className="px-6 py-4">Department</th>

              <th className="px-6 py-4">Actions</th>

            </tr>

          </thead>

          <tbody>

          {
              filteredUsers.length === 0 ? (

                  <tr>

                    <td colSpan="5" className="py-16">

                        <div className="flex flex-col items-center">

                            <div className="text-6xl">
                                <div className="bg-slate-100 rounded-full p-6">
                                    <FaUsers className="text-5xl text-slate-400" />
                                </div>
                            </div>

                            <h2 className="mt-4 text-2xl font-semibold text-slate-700">
                                No Users Found
                            </h2>

                            <p className="mt-2 text-slate-500">
                                There are no users to display.
                            </p>

                            <p className="text-slate-500">
                                Click
                                <span className="font-semibold text-blue-600">
                                    {" "}+ Add User{" "}
                                </span>
                                to create one.
                            </p>

                        </div>

                    </td>

                  </tr>

              ) : (

                  filteredUsers.map((user) => (

                      <tr
                          key={user.userId}
                          className="border-t hover:bg-slate-50 transition"
                      >

                          <td className="px-6 py-4">
                              {user.fullName}
                          </td>

                          <td className="px-6 py-4">
                              {user.email}
                          </td>

                          <td className="px-6 py-4">
                              {user.role}
                          </td>

                          <td className="px-6 py-4">
                              {user.department}
                          </td>

                          <td className="px-6 py-4">

                              <button
                                  onClick={() => handleEdit(user)}
                                  className="text-blue-600 hover:underline mr-4"
                              >
                                  Edit
                              </button>

                              <button
                                  onClick={() => {

                                      setSelectedUser(user);

                                      setShowDeleteModal(true);

                                  }}
                                  disabled={deletingUserId === user.userId}
                                  className={`hover:underline ${
                                      deletingUserId === user.userId
                                          ? "text-red-300 cursor-not-allowed"
                                          : "text-red-600"
                                  }`}
                              >
                                  {
                                      deletingUserId === user.userId
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
      showModal && (

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8">

              <h2 className="text-2xl font-bold text-slate-800">
                  {editingUser ? "Edit User" : "Add New User"}
              </h2>

              <p className="text-slate-500 mt-2">
                  {
                      editingUser
                          ? "Update employee information."
                          : "Create a new employee account."
                  }
              </p>

              <div className="mt-6 space-y-4">

                  <input
                      type="text"
                      value={newUser.fullName}
                      onChange={(e) =>
                          setNewUser({
                              ...newUser,
                              fullName: e.target.value
                          })
                      }
                      placeholder="Full Name"
                      className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) =>
                          setNewUser({
                              ...newUser,
                              email: e.target.value
                          })
                      }
                      placeholder="Email"
                      className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) =>
                          setNewUser({
                              ...newUser,
                              password: e.target.value
                          })
                      }
                      placeholder="Password"
                      className="w-full border rounded-xl px-4 py-3"
                  />

                  <select
                      value={newUser.roleId}
                      onChange={(e) =>
                          setNewUser({
                              ...newUser,
                              roleId: e.target.value
                          })
                      }
                      className="w-full border rounded-xl px-4 py-3"
                  >
                      <option>Select Role</option>

                      {
                          roles.map((role) => (

                              <option
                                  key={role.roleId}
                                  value={role.roleId}
                              >
                                  {role.roleName}
                              </option>

                          ))
                      }
                  </select>

                  <select
                      value={newUser.departmentId}
                      onChange={(e) =>
                          setNewUser({
                              ...newUser,
                              departmentId: Number(e.target.value)
                          })
                      }
                      className="w-full border rounded-xl px-4 py-3"
                  >
                      <option>Select Department</option>

                      {
                          departments.map((department) => (

                              <option
                                  key={department.departmentId}
                                  value={department.departmentId}
                              >
                                  {department.departmentName}
                              </option>

                          ))
                      }

                  </select>

              </div>

              <div className="flex justify-end gap-4 mt-8">

                  <button
                      onClick={() => {
                        setShowModal(false);

                        setEditingUser(null);

                      }}
                      className="px-6 py-3 rounded-xl border"
                  >
                      Cancel
                  </button>

                  <button
                      disabled={saving}
                      onClick={editingUser ? handleUpdateUser : handleCreateUser}
                      className={`px-6 py-3 rounded-xl text-white transition ${
                          saving
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                      {
                          saving
                              ? (editingUser ? "Updating..." : "Saving...")
                              : (editingUser ? "Update User" : "Save User")
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
                        Delete User
                    </h2>

                    <p className="mt-4 text-slate-500">

                        Are you sure you want to delete

                        <span className="font-semibold text-slate-800">
                            {" "}
                            {selectedUser?.fullName}
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

                            setSelectedUser(null);

                        }}
                        className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDeleteUser}
                        disabled={deletingUserId !== null}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-xl transition"
                    >
                        {
                            deletingUserId
                                ? "Deleting..."
                                : "Delete User"
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

export default UsersPage;