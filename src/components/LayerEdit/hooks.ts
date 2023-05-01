import client from "@/app/apollo-client";
import {
  Component,
  ComponentFragmentDoc,
  Layer,
  useDeleteLayerMutation,
  useDuplicateLayerMutation,
  useUpdateLayerMutation,
} from "@/generated/graphql";
import { showToast } from "@/utils/helpers";
import { useForm } from "react-hook-form";

export function useLayerAction({
  componentId,
  layerId,
  onUpdated,
}: {
  componentId: string;
  layerId: string;
  onUpdated?: (layer: Pick<Layer, "id" | "weight">) => void;
}) {
  const form = useForm();

  const [duplicateLayer, { loading: isDuplicateLayerMutationLoading }] =
    useDuplicateLayerMutation({
      onCompleted: () => {
        showToast({
          message: "Layer has been successfully duplicated!",
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

  const [deleteLayer, { loading: isDeleteLayerMutationLoading }] =
    useDeleteLayerMutation({
      onCompleted: (layerRes) => {
        const componentFragment = client.readFragment({
          id: `Component:${componentId}`,
          fragment: ComponentFragmentDoc,
          fragmentName: "component",
        }) as Component;

        client.writeFragment({
          id: `Component:${componentId}`,
          fragment: ComponentFragmentDoc,
          fragmentName: "component",
          data: {
            ...componentFragment,
            layers: componentFragment.layers?.filter((layer) => {
              return layer.id !== layerRes.deleteLayer.id;
            }),
          },
        });

        showToast({
          message: "Layer has been successfully deleted!",
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

  const [updateLayer, { loading: isUpdateLayerMutationLoading }] =
    useUpdateLayerMutation({
      onCompleted: () => {
        const { weight } = form.getValues();
        form.reset();

        onUpdated?.({ id: layerId, weight });

        showToast({
          message: "Layer has been successfully updated!",
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
    mutation: {
      duplicateLayer,
      updateLayer,
      deleteLayer,
    },

    loading: {
      isDuplicateLayerMutationLoading,
      isUpdateLayerMutationLoading,
      isDeleteLayerMutationLoading,
    },
  };
}
