function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-slate-500 text-sm font-medium">
        {title}
      </h2>

      <h1 className={`text-3xl font-bold mt-3 ${color}`}>
        {value}
      </h1>

    </div>
  );
}

export default StatCard;