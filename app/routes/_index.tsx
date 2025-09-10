import type { Route } from "./+types/_index";
import { Form, redirect, type ActionFunctionArgs } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Graffiti" }, { name: "description", content: "Welcome to Graffiti!" }];
}

export async function clientAction({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;

  if (!title) {
    return { error: "Title is required" };
  }

  try {
    const piece = await context.piece.create({ title });
    return redirect(`/piece/${piece._id}`);
  } catch (error: any) {
    return { error: error.message };
  }
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-8">
        <h1 className="text-9xl font-graffiti">Graffiti</h1>
        <h2 className="mt-4">Vandalize the web!</h2>
      </div>
      <Form method="post">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="border border-gray-300 rounded p-2 text-center"
          required
        />
        <button
          type="submit"
          className="block mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Create Piece
        </button>
      </Form>
    </div>
  );
}
