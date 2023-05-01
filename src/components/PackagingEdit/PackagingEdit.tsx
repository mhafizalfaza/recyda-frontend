"use client";

import client from "@/app/apollo-client";
import {
  Component,
  Packaging,
  PackagingFragmentDoc,
} from "@/generated/graphql";
import { sanitizeObject } from "@/utils/helpers";
import { confirmAlert } from "react-confirm-alert";
import ComponentEdit from "../ComponentEdit/ComponentEdit";
import { Button, ButtonScheme, ButtonType } from "../UI/Button/Button";
import { Input, InputScheme, InputType } from "../UI/Input/Input";
import { usePackagingAction } from "./hooks";

export default function PackagingEdit({
  data: packaging,
  projectId,
  disabled,
}: {
  data: Packaging;
  projectId: string;
  disabled?: boolean;
}) {
  const { form, state, mutation, loading } = usePackagingAction({
    projectId,
    packagingId: packaging.id,
  });

  const onSubmit = (formData: Omit<Packaging, "id">) => {
    mutation.updatePackaging({
      variables: { data: { id: packaging.id, ...sanitizeObject(formData) } },
    });
  };

  if (!packaging) {
    return <div>Not found</div>;
  }

  const onComponentUpdated = ({
    packaging: updatedPackaging,
    component,
  }: {
    packaging: Packaging;
    component: Pick<Component, "id" | "weight">;
  }) => {
    const packagingWeightTotal = Number(
      (
        Number(
          packaging.components
            ?.filter((eachComponent) => {
              return eachComponent.id !== component.id;
            })
            .reduce((accumulator, eachComponent) => {
              return Number(
                (accumulator + Number(eachComponent.weight)).toFixed(2)
              );
            }, 0)
        ) + Number(component.weight)
      ).toFixed(2)
    );

    client.writeFragment({
      id: `Packaging:${packaging.id}`,
      fragment: PackagingFragmentDoc,
      fragmentName: "packaging",
      data: {
        ...updatedPackaging,
        weight: packagingWeightTotal,
      },
    });
  };

  return (
    <div
      className="bg-gray-200 p-4 rounded-2xl flex flex-col items-start drop-shadow-md"
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
              defaultValue: packaging.name || "",
              ...form.register("name"),
            }}
            scheme={InputScheme.secondary}
            label="Packaging Name"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: packaging.packagingType || "",
              ...form.register("packagingType"),
            }}
            scheme={InputScheme.secondary}
            label="Packaging Type"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue:
                typeof packaging.position === "number"
                  ? packaging.position
                  : "",
              ...form.register("position", { valueAsNumber: true }),
            }}
            type={InputType.number}
            scheme={InputScheme.secondary}
            label="Position"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: packaging.width || "",
              ...form.register("width", { valueAsNumber: true }),
            }}
            type={InputType.number}
            min={0}
            scheme={InputScheme.secondary}
            label="Width (cm)"
            disabled={disabled}
          />
        </div>

        <div className="flex items-end" style={{ gap: 8 }}>
          <Input
            hook={{
              defaultValue: packaging.length || "",
              ...form.register("length", { valueAsNumber: true }),
            }}
            type={InputType.number}
            min={0}
            scheme={InputScheme.secondary}
            label="Length (cm)"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: packaging.height || "",
              ...form.register("height", { valueAsNumber: true }),
            }}
            type={InputType.number}
            min={0}
            scheme={InputScheme.secondary}
            label="Height (cm)"
            disabled={disabled}
          />

          <Input
            hook={{
              defaultValue: packaging.volume || "",
              ...form.register("volume", { valueAsNumber: true }),
            }}
            type={InputType.number}
            min={0}
            scheme={InputScheme.secondary}
            label="Volume (liter)"
            disabled={disabled}
          />

          <Input
            value={String(packaging.weight) || ""}
            scheme={InputScheme.secondary}
            label="Weight (gr)(calculated)"
            disabled={true}
          />

          {!disabled && (
            <Button
              type={ButtonType.submit}
              label="Save Packaging"
              scheme={ButtonScheme.secondary}
              disabled={
                !form.formState.isDirty ||
                loading.isUpdatePackagingMutationLoading
              }
            />
          )}
        </div>
      </form>

      {state.showComponents ? (
        <div className="flex flex-col" style={{ gap: 8 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <p className="font-bold">
              Components ({packaging.components?.length})
            </p>
            <Button
              label="Hide"
              onClick={() => state.setShowComponents(false)}
              scheme={ButtonScheme.secondary}
            />
            {!disabled && (
              <Button
                label="Add Component"
                onClick={() =>
                  mutation.createComponent({
                    variables: { data: { packagingId: packaging.id } },
                  })
                }
                scheme={ButtonScheme.tertiary}
                disabled={loading.isCreateComponentMutationLoading}
              />
            )}
          </div>
          <div className="flex flex-col" style={{ gap: 24 }}>
            {packaging.components?.length ? (
              packaging.components.map((component) => {
                return (
                  <ComponentEdit
                    key={component.id}
                    data={component}
                    onUpdated={onComponentUpdated}
                    packagingId={packaging.id}
                    disabled={disabled}
                  />
                );
              })
            ) : (
              <p>No Components</p>
            )}
          </div>
        </div>
      ) : (
        <Button
          label="Show components"
          onClick={() => state.setShowComponents(true)}
          scheme={ButtonScheme.tertiary}
        />
      )}

      {!disabled && (
        <div className="flex items-center" style={{ gap: 8 }}>
          <Button
            onClick={() =>
              mutation.duplicatePackaging({ variables: { id: packaging.id } })
            }
            label="Duplicate Packaging"
            scheme={ButtonScheme.secondaryAlt}
            disabled={loading.isDuplicatePackagingMutationLoading}
          />
          <Button
            onClick={() =>
              confirmAlert({
                title: "Confirm to submit",
                message: `Are you sure you want to delete packaging ${
                  packaging.name || packaging.id
                }?`,
                buttons: [
                  {
                    label: "Yes",
                    onClick: () =>
                      mutation.deletePackaging({
                        variables: { id: packaging.id },
                      }),
                  },
                  {
                    label: "No",
                    onClick: () => false,
                  },
                ],
              })
            }
            label="Remove Packaging"
            scheme={ButtonScheme.danger}
            disabled={loading.isDeletePackagingMutationLoading}
          />
        </div>
      )}
    </div>
  );
}
