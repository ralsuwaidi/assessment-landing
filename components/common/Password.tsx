/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Password() {
    return (
        <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="block min-w-[50vw] rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}
