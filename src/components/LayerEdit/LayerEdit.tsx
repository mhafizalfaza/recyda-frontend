"use client";

import { Component, Layer } from "@/generated/graphql";
import { confirmAlert } from "react-confirm-alert";
import { Controller } from "react-hook-form";
import { Button, ButtonScheme, ButtonType } from "../UI/Button/Button";
import { Input, InputScheme, InputType } from "../UI/Input/Input";
import { useLayerAction } from "./hooks";

export default function LayerEdit({
  data: layer,
  onUpdated,
  componentId,
  disabled,
}: {
  data: Layer;
  onUpdated?: (layer: Pick<Component, "id" | "weight">) => void;
  componentId: string;
  disabled?: boolean;
}) {
  const { form, mutation, loading } = useLayerAction({
    componentId,
    layerId: layer.id,
    onUpdated,
  });

  const onSubmit = (formData: Omit<Layer, "id">) => {
    mutation.updateLayer({
      variables: { data: { id: layer.id, ...formData } },
    });
  };

  if (!layer) {
    return <div>Not found</div>;
  }

  return (
    <div
      className="bg-gray-400 p-4 rounded-2xl flex flex-col items-start drop-shadow-md"
      style={{ gap: 24 }}
    >
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(onSubmit)();
        }}
        className="flex flex-col"
        style={{ gap: 8 }}
      >
        <div className="flex items-end" style={{ gap: 8 }}>
          <Input
            hook={{
              defaultValue: layer.name || "",
              ...form.register("name"),
            }}
            scheme={InputScheme.quaternary}
            label="Layer Name"
            disabled={disabled}
          />
          <Input
            hook={{
              defaultValue: layer.layerType || "",
              ...form.register("layerType"),
            }}
            scheme={InputScheme.quaternary}
            label="Layer Type"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: layer.materialKey || "",
              ...form.register("materialKey"),
            }}
            scheme={InputScheme.quaternary}
            label="Material Key"
            disabled={disabled}
          />
        </div>

        <div className="flex items-end" style={{ gap: 8 }}>
          <Controller
            name="visibleOuterLayer"
            control={form.control}
            render={({ field }) => {
              return (
                <div
                  className="flex items-center cursor-pointer"
                  style={{ gap: 4 }}
                >
                  <input
                    id={`visible-outer-layer-${layer.id}`}
                    type="checkbox"
                    checked={
                      field.value !== undefined
                        ? field.value
                        : Boolean(layer.visibleOuterLayer)
                    }
                    {...field}
                    disabled={disabled}
                  />
                  <label htmlFor={`visible-outer-layer-${layer.id}`}>
                    Visible Outer Layer
                  </label>
                </div>
              );
            }}
          />

          <Input
            hook={{
              defaultValue: layer.density || "",
              ...form.register("density", { valueAsNumber: true }),
            }}
            scheme={InputScheme.quaternary}
            label="Density"
            type={InputType.number}
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: layer.weight || "",
              ...form.register("weight", { valueAsNumber: true }),
            }}
            type={InputType.number}
            scheme={InputScheme.quaternary}
            label="Weight (gr)"
            disabled={disabled}
          />

          {!disabled && (
            <Button
              type={ButtonType.submit}
              label="Save Layer"
              scheme={ButtonScheme.quaternary}
              disabled={
                !form.formState.isDirty || loading.isUpdateLayerMutationLoading
              }
            />
          )}
        </div>
      </form>

      {!disabled && (
        <div className="flex items-center" style={{ gap: 8 }}>
          <Button
            onClick={() =>
              mutation.duplicateLayer({ variables: { id: layer.id } })
            }
            label="Duplicate Layer"
            scheme={ButtonScheme.quaternaryAlt}
            disabled={loading.isDuplicateLayerMutationLoading}
          />

          <Button
            onClick={() =>
              confirmAlert({
                title: "Confirm to submit",
                message: `Are you sure you want to delete layer ${
                  layer.name || layer.id
                }?`,
                buttons: [
                  {
                    label: "Yes",
                    onClick: () =>
                      mutation.deleteLayer({ variables: { id: layer.id } }),
                  },
                  {
                    label: "No",
                    onClick: () => false,
                  },
                ],
              })
            }
            label="Remove Layer"
            scheme={ButtonScheme.danger}
            disabled={loading.isDeleteLayerMutationLoading}
          />
        </div>
      )}
    </div>
  );
}
