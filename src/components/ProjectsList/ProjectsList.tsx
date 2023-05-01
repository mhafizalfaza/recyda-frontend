"use client";

import { useProjectsQuery } from "@/generated/graphql";
import { bgClasses } from "@/utils/helpers";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "../UI/Input/Input";
import debounce from "debounce";
import { ChangeEvent, useEffect, useState } from "react";

export default function Projects() {
  const [nameFilter, setNameFilter] = useState("");
  const [keyFilter, setKeyFilter] = useState("");
  const { register } = useForm();

  const { data, loading, error, refetch } = useProjectsQuery({
    variables: {},
  });

  useEffect(() => {
    refetch({ name: nameFilter || undefined, key: keyFilter || undefined });
  }, [nameFilter, keyFilter, refetch]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  const projects = data?.projects;

  return (
    <div
      className="bg-gray-300 p-4 flex items-start drop-shadow-md min-h-screen"
      style={{ gap: 16 }}
    >
      <form className="flex flex-col" style={{ gap: 16 }}>
        <Input
          hook={{ defaultValue: "", ...register("nameFilter") }}
          label="Name Filter"
          onChange={debounce(async (evt: ChangeEvent<HTMLInputElement>) => {
            setNameFilter(evt.target.value);
          }, 500)}
          placeholder={'Try "bottle"'}
        />

        <Input
          hook={{ defaultValue: "", ...register("keyFilter") }}
          label="Key Filter"
          onChange={debounce(async (evt: ChangeEvent<HTMLInputElement>) => {
            setKeyFilter(evt.target.value);
          }, 500)}
          placeholder="Enter project key"
        />
      </form>
      <div className="flex items-start flex-wrap" style={{ gap: 16 }}>
        {projects?.map((project, index) => {
          return (
            <Link
              href={`projects/${encodeURIComponent(project.id)}`}
              key={project.id}
              className="hover:opacity-60"
            >
              <div
                className={`p-4 ${bgClasses(
                  index % 4
                )} rounded-2xl text-white drop-shadow-md`}
              >
                <div>
                  <strong>{project.name}</strong>
                  <p className="text-xs">{project.key}</p>
                </div>
                <div>
                  {project.packagingsCount} Packaging
                  {Number(project.packagingsCount) > 1 ? "s" : ""}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
