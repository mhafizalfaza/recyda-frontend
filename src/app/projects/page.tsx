"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import Projects from "@/components/ProjectsList/ProjectsList";

export default function ProjectsPage() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Projects />
      </div>
    </ApolloProvider>
  );
}
