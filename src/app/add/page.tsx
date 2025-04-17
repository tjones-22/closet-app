import Link from "next/link";

const Home = () => {
  return (

    // homepage link
    <div className="min-h-screen bg-blue-50 relative px-4">
      <Link
        href="/"
        className="absolute top-4 left-4 text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to Home
      </Link>

        {/*Form*/}
      <div className="flex items-center justify-center pt-12">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-3xl font-semibold text-center text-blue-950 underline mb-8">
            Add New Item to Closet
          </h2>

          <form className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              
              
              {/* Type */}
              <label htmlFor="type" className="w-32 text-blue-950 font-medium">
                Type:
              </label>
              <input
                type="text"
                id="type"
                name="type"
                className="flex-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Color */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="color" className="w-32 text-blue-950 font-medium">
                Color:
              </label>
              <input
                type="text"
                id="color"
                name="color"
                className="flex-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Style */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="style" className="w-32 text-blue-950 font-medium">
                Style:
              </label>
              <input
                type="text"
                id="style"
                name="style"
                className="flex-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Occasion */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label
                htmlFor="occasion"
                className="w-32 text-blue-950 font-medium"
              >
                Occasion:
              </label>
              <input
                type="text"
                id="occasion"
                name="occasion"
                className="flex-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Image */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="image" className="w-32 text-blue-950 font-medium">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                required
              />
            </div>

            
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
