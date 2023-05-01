"use client";

import { Project } from "@/generated/graphql";
import { useState } from "react";
import PackagingEdit from "../PackagingEdit/PackagingEdit";
import { Button, ButtonScheme, ButtonType } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { useProjectAction } from "./hooks";

export default function ProjectEdit({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) {
  const { form, data, error, mutation, loading } = useProjectAction(id);

  const onSubmit = (formData: Omit<Project, "id">) => {
    mutation.updateProject({
      variables: { data: { id, ...formData } },
    });
  };

  const [showPackagings, setShowPackagings] = useState(false);

  if (loading.isProjectQueryLoading) {
    return <div className="lds-dual-ring"></div>;
  }

  if (error.isProjectQueryError) {
    return <div>Something went wrong</div>;
  }

  const project = data.projectQueryData?.project;

  if (!project) {
    return <div>Not found</div>;
  }

  return (
    <div
      className="bg-gray-300 p-4 rounded-2xl flex flex-col items-start drop-shadow-md"
      style={{ gap: 24 }}
    >
      <form
        className="flex items-end"
        style={{ gap: 8 }}
        onSubmit={(evt) => {
          evt.preventDefault();
          // @ts-expect-error
          form.handleSubmit(onSubmit)();
        }}
      >
        <Input
          hook={{
            defaultValue: project.name || "",
            ...form.register("name"),
          }}
          label="Project Name"
          disabled={disabled}
        />

        <Input
          hook={{
            defaultValue: project.key || "",
            ...form.register("key", { required: true }),
          }}
          label="Project Key"
          width={360}
          disabled={disabled}
        />
        {!disabled && (
          <Button
            type={ButtonType.submit}
            label="Save Project"
            disabled={
              !form.formState.isDirty || loading.isUpdateProjectMutationLoading
            }
          />
        )}
      </form>

      {showPackagings ? (
        <div className="flex flex-col" style={{ gap: 8 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <p className="font-bold">
              Packagings ({project.packagings?.length})
            </p>
            <Button label="Hide" onClick={() => setShowPackagings(false)} />
            {!disabled && (
              <Button
                label="Add Packaging"
                onClick={() =>
                  mutation.createPackaging({
                    variables: { data: { projectId: id } },
                  })
                }
                scheme={ButtonScheme.secondary}
                disabled={loading.isCreatePackagingMutationLoading}
              />
            )}
          </div>

          <div className="flex flex-col" style={{ gap: 24 }}>
            {project.packagings?.map((packaging, index) => {
              return (
                <PackagingEdit
                  key={packaging.id}
                  data={packaging}
                  disabled={disabled}
                  projectId={id}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Button
          label="Show packagings"
          onClick={() => setShowPackagings(true)}
          scheme={ButtonScheme.secondary}
        />
      )}
    </div>
  );
}
