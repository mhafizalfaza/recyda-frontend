import client from "@/app/apollo-client";
import {
  Component,
  ComponentFragmentDoc,
  Packaging,
  PackagingFragmentDoc,
  useCreateLayerMutation,
  useDeleteComponentMutation,
  useDuplicateComponentMutation,
  useUpdateComponentMutation,
} from "@/generated/graphql";
import { showToast } from "@/utils/helpers";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useComponentAction({
  packagingId,
  componentId,
}: {
  packagingId: string;
  componentId: string;
}) {
  const form = useForm();
  const [showLayers, setShowLayers] = useState(false);

  const [duplicateComponent, { loading: isDuplicateComponentMutationLoading }] =
    useDuplicateComponentMutation({
      onCompleted: () => {
        showToast({
          message: "Component has been successfully duplicated!",
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

  const [updateComponent, { loading: isUpdateComponentMutationLoading }] =
    useUpdateComponentMutation({
      onCompleted: () => {
        form.reset();
        showToast({
          message: "Component has been successfully updated!",
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

  const [deleteComponent, { loading: isDeleteComponentMutationLoading }] =
    useDeleteComponentMutation({
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
            components: packagingFragment.components?.filter((component) => {
              return component.id !== componentRes.deleteComponent.id;
            }),
          },
        });

        showToast({
          message: "Component has been successfully deleted!",
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

  const [createLayer, { loading: isCreateLayerMutationLoading }] =
    useCreateLayerMutation({
      onCompleted: (layerRes) => {
        const componentFragment = client.readFragment({
          id: `Component:${componentId}`, // The value of the to-do item's cache ID
          fragment: ComponentFragmentDoc,
          fragmentName: "component",
        }) as Component;

        client.writeFragment({
          id: `Component:${componentId}`,
          fragment: ComponentFragmentDoc,
          fragmentName: "component",
          data: {
            ...componentFragment,
            layers: [...(componentFragment.layers || []), layerRes.createLayer],
          },
        });

        showToast({
          message: "Layer has been successfully created!",
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
      showLayers,
      setShowLayers,
    },
    mutation: {
      duplicateComponent,
      updateComponent,
      deleteComponent,
      createLayer,
    },

    loading: {
      isDuplicateComponentMutationLoading,
      isUpdateComponentMutationLoading,
      isDeleteComponentMutationLoading,
      isCreateLayerMutationLoading,
    },
  };
}
