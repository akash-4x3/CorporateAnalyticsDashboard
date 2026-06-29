import { FaExclamationTriangle } from "react-icons/fa";

function LowPerformers({ performers }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-4">
        Low Performers
      </h2>

      {performers.length === 0 ? (
        <p className="text-green-600 font-medium">
          No low performers found.
        </p>
      ) : (
        <div className="space-y-3">

          {performers.map((employee) => (

            <div
              key={employee.userId}
              className="flex justify-between items-center border rounded-lg p-3"
            >
              <div className="flex items-center gap-3">

                <FaExclamationTriangle className="text-yellow-500" />

                <div>
                  <h3 className="font-semibold">
                    {employee.employeeName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {employee.departmentName}
                  </p>
                </div>

              </div>

              <span className="font-bold text-red-600">
                {employee.performanceScore}
              </span>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default LowPerformers;