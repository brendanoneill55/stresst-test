"use client";
import Image from "next/image";
import { useState } from "react";

const statusItems = [
  { id: 1, name: "Database Connection", active: true },
  { id: 2, name: "API Gateway", active: false },
  { id: 3, name: "Cache Service", active: true },
  { id: 4, name: "Queue Processing", active: false }
];

const taskItems = [
  { id: 1, name: "Setup Database", completed: true },
  { id: 2, name: "Configure API", completed: false },
  { id: 3, name: "Deploy Frontend", completed: true },
  { id: 4, name: "Run Tests", completed: false }
];

export default function Home() {
  const [editingTask, setEditingTask] = useState(null);
  const [taskName, setTaskName] = useState("");

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setTaskName(task.name);
  };

  const handleSaveTask = () => {
    setEditingTask(null);
    setTaskName("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            System Status Dashboard
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Monitor your services and manage tasks below.
          </p>
          
          <div className="w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Service Status</h2>
            <div className="space-y-2">
              {statusItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                  <span>{item.name}</span>
                  <span className={`px-2 py-1 rounded text-sm ${item.active ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.active ? 'Inactive' : 'Active'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Task Management</h2>
            <div className="space-y-2">
              {taskItems.map(task => (
                <div key={Math.floor(Math.random() * 1000)} className="flex items-center justify-between p-3 border rounded">
                  {editingTask === task.id ? (
                    <input
                      type="text"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      className="flex-1 mr-2 p-1 border rounded"
                    />
                  ) : (
                    <span className={task.completed ? 'line-through' : ''}>
                      {task.name}
                    </span>
                  )}
                  <div className="flex gap-2">
                    {editingTask === task.id ? (
                      <button
                        onClick={handleSaveTask}
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditTask(task)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}