function TopPerformers({ performers }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-4">
        Top Performers
      </h2>

      <table className="w-full">

        <thead>
          <tr className="text-left border-b">
            <th className="pb-3">#</th>
            <th className="pb-3">Employee</th>
            <th className="pb-3">Department</th>
            <th className="pb-3">Score</th>
          </tr>
        </thead>

        <tbody>

          {performers.map((employee, index) => (

            <tr
              key={employee.userId}
              className="border-b last:border-none"
            >

              <td className="py-3">
                {index + 1}
              </td>

              <td>{employee.employeeName}</td>

              <td>{employee.departmentName}</td>

              <td>{employee.performanceScore}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TopPerformers;