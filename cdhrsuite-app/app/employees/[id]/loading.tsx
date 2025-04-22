export default function Loading() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse mr-4"></div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((column) => (
          <div key={column}>
            {[1, 2, 3].map((card) => (
              <div key={`${column}-${card}`} className="bg-white rounded-lg shadow mb-6">
                <div className="bg-gray-50 border-b py-3 px-4">
                  <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}