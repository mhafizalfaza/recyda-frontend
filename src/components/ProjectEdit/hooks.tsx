import client from "@/app/apollo-client";
import {
  Project,
  ProjectFragmentDoc,
  useCreatePackagingMutation,
  useProjectQuery,
  useUpdateProjectMutation,
} from "@/generated/graphql";
import { showToast } from "@/utils/helpers";
import { useForm } from "react-hook-form";

export function useProjectAction(projectId: string) {
  const {
    data: projectQueryData,
    loading: isProjectQueryLoading,
    error: isProjectQueryError,
  } = useProjectQuery({
    variables: { id: projectId },
  });

  const form = useForm();

  const [updateProject, { loading: isUpdateProjectMutationLoading }] =
    useUpdateProjectMutation({
      onCompleted: () => {
        form.reset();
        showToast({
          message: "Project has been successfully updated!",
          type: "success",
        });
      },
      onError: () => {
        showToast({
          message: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });

  const [createPackaging, { loading: isCreatePackagingMutationLoading }] =
    useCreatePackagingMutation({
      onCompleted: (packagingRes) => {
        const projectFragment = client.readFragment({
          id: `Project:${projectId}`,
          fragment: ProjectFragmentDoc,
          fragmentName: "project",
        }) as Project;

        client.writeFragment({
          id: `Project:${projectId}`,
          fragment: ProjectFragmentDoc,
          fragmentName: "project",
          data: {
            ...projectFragment,
            packagings: [
              ...(projectFragment.packagings || []),
              packagingRes.createPackaging,
            ],
          },
        });

        showToast({
          message: "Packaging has been successfully created!",
          type: "success",
        });
      },
      onError: () => {
        showToast({
          message: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });

  return {
    form,
    data: {
      projectQueryData,
    },
    error: {
      isProjectQueryError,
    },
    mutation: {
      updateProject,
      createPackaging,
    },
    loading: {
      isProjectQueryLoading,
      isUpdateProjectMutationLoading,
      isCreatePackagingMutationLoading,
    },
  };
}
