"use client";

import client from "@/app/apollo-client";
import {
  Component,
  ComponentFragmentDoc,
  Layer,
  Packaging,
  PackagingFragmentDoc,
} from "@/generated/graphql";
import { confirmAlert } from "react-confirm-alert";
import LayerEdit from "../LayerEdit/LayerEdit";
import { Button, ButtonScheme, ButtonType } from "../UI/Button/Button";
import { Input, InputScheme, InputType } from "../UI/Input/Input";
import { useComponentAction } from "./hooks";

export default function ComponentEdit({
  data: component,
  onUpdated,
  packagingId,
  disabled,
}: {
  data: Component;
  onUpdated?: ({
    packaging,
    component,
  }: {
    packaging: Packaging;
    component: Pick<Component, "id" | "weight">;
  }) => void;
  packagingId: string;
  disabled?: boolean;
}) {
  const { form, state, mutation, loading } = useComponentAction({
    packagingId,
    componentId: component.id,
  });

  const onSubmit = (formData: Omit<Component, "id">) => {
    mutation.updateComponent({
      variables: { data: { id: component.id, ...formData } },
    });
  };

  if (!component) {
    return <div>Not Found</div>;
  }

  const onLayerUpdated = ({ id, weight }: Pick<Layer, "id" | "weight">) => {
    const componentWeightTotal =
      Number(
        component.layers
          ?.filter((layer) => {
            return layer.id !== id;
          })
          .reduce((accumulator, eachLayer) => {
            return Number((accumulator + Number(eachLayer.weight)).toFixed(2));
          }, 0)
      ) + Number(weight);

    const updatedComponent = client.readFragment({
      id: `Component:${component.id}`,
      fragment: ComponentFragmentDoc,
      fragmentName: "component",
    }) as Component;

    client.writeFragment({
      id: `Component:${component.id}`,
      fragment: ComponentFragmentDoc,
      fragmentName: "component",
      data: {
        ...updatedComponent,
        weight: componentWeightTotal,
      },
    });

    const packaging = client.readFragment({
      id: `Packaging:${packagingId}`,
      fragment: PackagingFragmentDoc,
      fragmentName: "packaging",
    }) as Packaging;

    onUpdated?.({
      packaging,
      component: { id: updatedComponent.id, weight: componentWeightTotal },
    });
  };

  return (
    <div
      className="bg-gray-300 p-4 rounded-2xl flex flex-col items-start drop-shadow-md"
      style={{ gap: 24 }}
    >
      <form
        className="flex flex-col"
        style={{ gap: 8 }}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(onSubmit)();
        }}
      >
        <div className="flex items-end" style={{ gap: 8 }}>
          <Input
            hook={{
              defaultValue: component.name || "",
              ...form.register("name"),
            }}
            scheme={InputScheme.tertiary}
            label="Component Name"
            disabled={disabled}
          />
          <Input
            hook={{
              defaultValue: component.componentType || "",
              ...form.register("componentType"),
            }}
            scheme={InputScheme.tertiary}
            label="Component Type"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: component.colour || "",
              ...form.register("colour"),
            }}
            scheme={InputScheme.tertiary}
            label="Colour"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: component.colourant || "",
              ...form.register("colourant"),
            }}
            scheme={InputScheme.tertiary}
            label="Colourant"
            disabled={disabled}
          />
        </div>

        <div className="flex items-end" style={{ gap: 8 }}>
          <Input
            hook={{
              defaultValue: component.coverage || "",
              ...form.register("coverage", { valueAsNumber: true }),
            }}
            scheme={InputScheme.tertiary}
            label="Coverage"
            type={InputType.number}
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: component.opacity || "",
              ...form.register("opacity"),
            }}
            scheme={InputScheme.tertiary}
            label="Opacity"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: component.position || "",
              ...form.register("position", { valueAsNumber: true }),
            }}
            scheme={InputScheme.tertiary}
            label="Position"
            type={InputType.number}
            disabled={disabled}
          />

          <Input
            value={String(component.weight) || ""}
            scheme={InputScheme.tertiary}
            label="Weight (gr)(calculated)"
            disabled={true}
          />

          {!disabled && (
            <Button
              type={ButtonType.submit}
              label="Save Component"
              scheme={ButtonScheme.tertiary}
              disabled={
                !form.formState.isDirty ||
                loading.isUpdateComponentMutationLoading
              }
            />
          )}
        </div>
      </form>

      {state.showLayers ? (
        <div className="flex flex-col" style={{ gap: 8 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <p className="font-bold">Layers ({component.layers?.length})</p>
            <Button
              label="Hide"
              onClick={() => state.setShowLayers(false)}
              scheme={ButtonScheme.tertiary}
            />
            {!disabled && (
              <Button
                label="Add Layer"
                onClick={() =>
                  mutation.createLayer({
                    variables: { data: { componentId: component.id } },
                  })
                }
                scheme={ButtonScheme.quaternary}
                disabled={loading.isCreateLayerMutationLoading}
              />
            )}
          </div>
          <div className="flex flex-col" style={{ gap: 24 }}>
            {component.layers?.length ? (
              component.layers.map((layer) => {
                return (
                  <LayerEdit
                    key={layer.id}
                    data={layer}
                    onUpdated={onLayerUpdated}
                    componentId={component.id}
                    disabled={disabled}
                  />
                );
              })
            ) : (
              <p>No Layers</p>
            )}
          </div>
        </div>
      ) : (
        <Button
          label="Show layers"
          onClick={() => state.setShowLayers(true)}
          scheme={ButtonScheme.quaternary}
        />
      )}

      {!disabled && (
        <div className="flex items-center" style={{ gap: 8 }}>
          <Button
            onClick={() =>
              mutation.duplicateComponent({ variables: { id: component.id } })
            }
            label="Duplicate Component"
            scheme={ButtonScheme.tertiaryAlt}
            disabled={loading.isDuplicateComponentMutationLoading}
          />

          <Button
            onClick={() =>
              confirmAlert({
                title: "Confirm to submit",
                message: `Are you sure you want to delete component ${
                  component.name || component.id
                }?`,
                buttons: [
                  {
                    label: "Yes",
                    onClick: () =>
                      mutation.deleteComponent({
                        variables: { id: component.id },
                      }),
                  },
                  {
                    label: "No",
                    onClick: () => false,
                  },
                ],
              })
            }
            label="Remove Component"
            scheme={ButtonScheme.danger}
            disabled={loading.isDeleteComponentMutationLoading}
          />
        </div>
      )}
    </div>
  );
}
