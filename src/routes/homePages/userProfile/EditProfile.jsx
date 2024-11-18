
export default function EditProfile(){

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 p-10 flex justify-center items-center">
            <div className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800"> Edit Profile </h2>
            
                </div>
                
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded text-stone-200"
                        />
                    </div>

 
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded text-stone-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Favorite Animal</label>
                        <input
                            placeholder="What animal caught your attention?"
                            className="w-full p-3 border border-gray-300 rounded text-stone-200"
                        ></input>
                    </div>

                    <button className="bg-green-400 text-white px-6 py-2 rounded hover:bg-green-500 transition">
                        Save Changes
                    </button>
            </form>

            </div>
        </div>
    );
};