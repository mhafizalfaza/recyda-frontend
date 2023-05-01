"use client";

import ProjectEdit from "@/components/ProjectEdit/ProjectEdit";
import { ApolloProvider } from "@apollo/client";
import Link from "next/link";

import client from "../../apollo-client";

export default function ProjectEditPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <ApolloProvider client={client}>
      <div className="p-4 flex flex-col" style={{ gap: 24 }}>
        <div className="flex items-center" style={{ gap: 16 }}>
          <p>
            Project ID: <strong>{params.projectId}</strong>
          </p>
          <Link
            href={`projects/${params.projectId}/edit`}
            className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-2xl"
          >
            Edit
          </Link>
        </div>
        <ProjectEdit id={params.projectId} disabled />
      </div>
    </ApolloProvider>
  );
}
