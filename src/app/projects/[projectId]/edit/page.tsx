"use client";

import ProjectEdit from "@/components/ProjectEdit/ProjectEdit";
import { ApolloProvider } from "@apollo/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

import client from "../../../apollo-client";

export default function ProjectEditPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <ApolloProvider client={client}>
      <div className="p-4 flex flex-col" style={{ gap: 24 }}>
        <div>
          Editing Project{" "}
          <strong>{decodeURIComponent(params.projectId)}</strong>
        </div>
        <ProjectEdit id={params.projectId} />
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
}
