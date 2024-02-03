export default function Loading() {
    return (
        <div class="flex items-center justify-center h-screen">
        <div class="flex space-x-2">
          <div class="h-10 w-10 bg-red-500 rounded-full animate-bounce"></div>
          <div class="h-10 w-10 bg-green-500 rounded-full animate-bounce"></div>
          <div class="h-10 w-10 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    )
  }