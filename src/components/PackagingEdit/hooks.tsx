import client from "@/app/apollo-client";
import {
  Packaging,
  PackagingFragmentDoc,
  Project,
  ProjectFragmentDoc,
  useCreateComponentMutation,
  useDeletePackagingMutation,
  useDuplicatePackagingMutation,
  useUpdatePackagingMutation,
} from "@/generated/graphql";
import { showToast } from "@/utils/helpers";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function usePackagingAction({
  projectId,
  packagingId,
}: {
  projectId: string;
  packagingId: string;
}) {
  const form = useForm();
  const [showComponents, setShowComponents] = useState(false);

  const [duplicatePackaging, { loading: isDuplicatePackagingMutationLoading }] =
    useDuplicatePackagingMutation({
      onCompleted: () => {
        showToast({
          message: "Packaging has been successfully duplicated!",
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

  const [updatePackaging, { loading: isUpdatePackagingMutationLoading }] =
    useUpdatePackagingMutation({
      onCompleted: () => {
        form.reset();
        showToast({
          message: "Packaging has been successfully updated!",
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

  const [createComponent, { loading: isCreateComponentMutationLoading }] =
    useCreateComponentMutation({
      onCompleted: (componentRes) => {
        const packagingFragment = client.readFragment({
          id: `Packaging:${packagingId}`,
          fragment: PackagingFragmentDoc,
          fragmentName: "packaging",
        }) as Packaging;

        client.writeFragment({
          id: `Packaging:${packagingId}`,
          fragment: PackagingFragmentDoc,
          fragmentName: "packaging",
          data: {
            ...packagingFragment,
            components: [
              ...(packagingFragment.components || []),
              componentRes.createComponent,
            ],
          },
        });

        showToast({
          message: "Component has been successfully created!",
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

  const [deletePackaging, { loading: isDeletePackagingMutationLoading }] =
    useDeletePackagingMutation({
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
            packagings: projectFragment.packagings?.filter((packaging) => {
              return packaging.id !== packagingRes.deletePackaging.id;
            }),
          },
        });

        showToast({
          message: "Packaging has been successfully deleted!",
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
    state: {
      showComponents,
      setShowComponents,
    },
    mutation: {
      duplicatePackaging,
      updatePackaging,
      deletePackaging,
      createComponent,
    },

    loading: {
      isDuplicatePackagingMutationLoading,
      isUpdatePackagingMutationLoading,
      isDeletePackagingMutationLoading,
      isCreateComponentMutationLoading,
    },
  };
}
