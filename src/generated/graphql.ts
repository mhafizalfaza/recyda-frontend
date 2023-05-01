import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** The component model */
export type Component = {
  __typename?: 'Component';
  /** The colour of the component */
  colour?: Maybe<Scalars['String']>;
  /** The colourant of the component */
  colourant?: Maybe<Scalars['String']>;
  /** The type of the component */
  componentType?: Maybe<Scalars['String']>;
  /** The coverage of the component */
  coverage?: Maybe<Scalars['Float']>;
  /** The unique identifier of the component */
  id: Scalars['String'];
  /** The list of layers of the component */
  layers?: Maybe<Array<Layer>>;
  /** The name of the component */
  name?: Maybe<Scalars['String']>;
  /** The opacity of the component */
  opacity?: Maybe<Scalars['String']>;
  /** The position of the component */
  position?: Maybe<Scalars['Float']>;
  /** The weight of the component (sum of the weight of all layers) in gram */
  weight?: Maybe<Scalars['Float']>;
};

export type CreateComponentInput = {
  colour?: InputMaybe<Scalars['String']>;
  colourant?: InputMaybe<Scalars['String']>;
  componentType?: InputMaybe<Scalars['String']>;
  coverage?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  opacity?: InputMaybe<Scalars['String']>;
  packagingId: Scalars['String'];
  position?: InputMaybe<Scalars['Float']>;
};

export type CreateLayerInput = {
  componentId: Scalars['String'];
  density?: InputMaybe<Scalars['Float']>;
  layerType?: InputMaybe<Scalars['String']>;
  materialKey?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Float']>;
  visibleOuterLayer?: InputMaybe<Scalars['Boolean']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type CreatePackagingInput = {
  height?: InputMaybe<Scalars['Float']>;
  length?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  packagingType?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Float']>;
  projectId: Scalars['String'];
  volume?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

/** The layer model */
export type Layer = {
  __typename?: 'Layer';
  /** The density of the layer */
  density?: Maybe<Scalars['Float']>;
  /** The unique identifier of the layer */
  id: Scalars['String'];
  /** The type of the layer */
  layerType?: Maybe<Scalars['String']>;
  /** The material key of the layer */
  materialKey?: Maybe<Scalars['String']>;
  /** The name of the layer */
  name?: Maybe<Scalars['String']>;
  /** The position of the layer */
  position?: Maybe<Scalars['Float']>;
  /** The visible outer of the layer */
  visibleOuterLayer?: Maybe<Scalars['Boolean']>;
  /** The weight of the layer in gram */
  weight?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComponent: Component;
  createLayer: Layer;
  createPackaging: Packaging;
  deleteComponent: Component;
  deleteLayer: Layer;
  deletePackaging: Packaging;
  duplicateComponent: Project;
  duplicateLayer: Project;
  duplicatePackaging: Project;
  updateComponent: Component;
  updateLayer: Layer;
  updatePackaging: Packaging;
  updateProject: Project;
};


export type MutationCreateComponentArgs = {
  data: CreateComponentInput;
};


export type MutationCreateLayerArgs = {
  data: CreateLayerInput;
};


export type MutationCreatePackagingArgs = {
  data: CreatePackagingInput;
};


export type MutationDeleteComponentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLayerArgs = {
  id: Scalars['String'];
};


export type MutationDeletePackagingArgs = {
  id: Scalars['String'];
};


export type MutationDuplicateComponentArgs = {
  id: Scalars['String'];
};


export type MutationDuplicateLayerArgs = {
  id: Scalars['String'];
};


export type MutationDuplicatePackagingArgs = {
  id: Scalars['String'];
};


export type MutationUpdateComponentArgs = {
  data: UpdateComponentInput;
};


export type MutationUpdateLayerArgs = {
  data: UpdateLayerInput;
};


export type MutationUpdatePackagingArgs = {
  data: UpdatePackagingInput;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};

/** The packaging model */
export type Packaging = {
  __typename?: 'Packaging';
  /** The list of components of the packaging */
  components?: Maybe<Array<Component>>;
  /** The height of the packaging in centimeter */
  height?: Maybe<Scalars['Float']>;
  /** The unique identifier of the packaging */
  id: Scalars['String'];
  /** The length of the packaging in centimeter */
  length?: Maybe<Scalars['Float']>;
  /** The name of the packaging */
  name?: Maybe<Scalars['String']>;
  /** The packagingType of the packaging */
  packagingType?: Maybe<Scalars['String']>;
  /** The position of the packaging */
  position?: Maybe<Scalars['Float']>;
  /** The volume of the packaging in liter */
  volume?: Maybe<Scalars['Float']>;
  /** The weight of the packaging (sum of the weight of all components) in gram */
  weight?: Maybe<Scalars['Float']>;
  /** The width of the packaging in centimeter */
  width?: Maybe<Scalars['Float']>;
};

/** The project model */
export type Project = {
  __typename?: 'Project';
  /** The unique identifier of the project */
  id: Scalars['String'];
  /** The key of the project */
  key: Scalars['String'];
  /** The name of the project */
  name?: Maybe<Scalars['String']>;
  /** The list of packagings of the project */
  packagings?: Maybe<Array<Packaging>>;
  /** The number of packagings in the project */
  packagingsCount?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  project: Project;
  projects: Array<Project>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryProjectsArgs = {
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type UpdateComponentInput = {
  colour?: InputMaybe<Scalars['String']>;
  colourant?: InputMaybe<Scalars['String']>;
  componentType?: InputMaybe<Scalars['String']>;
  coverage?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  opacity?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Float']>;
};

export type UpdateLayerInput = {
  density?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  layerType?: InputMaybe<Scalars['String']>;
  materialKey?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Float']>;
  visibleOuterLayer?: InputMaybe<Scalars['Boolean']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type UpdatePackagingInput = {
  height?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  length?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  packagingType?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Float']>;
  volume?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type UpdateProjectInput = {
  id: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ComponentFragment = { __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null };

export type CreateComponentMutationVariables = Exact<{
  data: CreateComponentInput;
}>;


export type CreateComponentMutation = { __typename?: 'Mutation', createComponent: { __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null } };

export type UpdateComponentMutationVariables = Exact<{
  data: UpdateComponentInput;
}>;


export type UpdateComponentMutation = { __typename?: 'Mutation', updateComponent: { __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null } };

export type DuplicateComponentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DuplicateComponentMutation = { __typename?: 'Mutation', duplicateComponent: { __typename?: 'Project', id: string, key: string, name?: string | null, packagings?: Array<{ __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null }> | null } };

export type DeleteComponentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteComponentMutation = { __typename?: 'Mutation', deleteComponent: { __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null } };

export type LayerFragment = { __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null };

export type CreateLayerMutationVariables = Exact<{
  data: CreateLayerInput;
}>;


export type CreateLayerMutation = { __typename?: 'Mutation', createLayer: { __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null } };

export type UpdateLayerMutationVariables = Exact<{
  data: UpdateLayerInput;
}>;


export type UpdateLayerMutation = { __typename?: 'Mutation', updateLayer: { __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null } };

export type DuplicateLayerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DuplicateLayerMutation = { __typename?: 'Mutation', duplicateLayer: { __typename?: 'Project', id: string, key: string, name?: string | null, packagings?: Array<{ __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null }> | null } };

export type DeleteLayerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteLayerMutation = { __typename?: 'Mutation', deleteLayer: { __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null } };

export type PackagingFragment = { __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null };

export type CreatePackagingMutationVariables = Exact<{
  data: CreatePackagingInput;
}>;


export type CreatePackagingMutation = { __typename?: 'Mutation', createPackaging: { __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null } };

export type UpdatePackagingMutationVariables = Exact<{
  data: UpdatePackagingInput;
}>;


export type UpdatePackagingMutation = { __typename?: 'Mutation', updatePackaging: { __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null } };

export type DuplicatePackagingMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DuplicatePackagingMutation = { __typename?: 'Mutation', duplicatePackaging: { __typename?: 'Project', id: string, key: string, name?: string | null, packagings?: Array<{ __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null }> | null } };

export type DeletePackagingMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePackagingMutation = { __typename?: 'Mutation', deletePackaging: { __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null } };

export type ProjectFragment = { __typename?: 'Project', id: string, key: string, name?: string | null, packagings?: Array<{ __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null }> | null };

export type ProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, key: string, name?: string | null, packagings?: Array<{ __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null }> | null } };

export type ProjectsQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name?: string | null, key: string, packagingsCount?: number | null }> };

export type UpdateProjectMutationVariables = Exact<{
  data: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, key: string, name?: string | null, packagings?: Array<{ __typename?: 'Packaging', id: string, name?: string | null, packagingType?: string | null, position?: number | null, weight?: number | null, width?: number | null, length?: number | null, height?: number | null, volume?: number | null, components?: Array<{ __typename?: 'Component', id: string, colour?: string | null, colourant?: string | null, componentType?: string | null, coverage?: number | null, name?: string | null, opacity?: string | null, position?: number | null, weight?: number | null, layers?: Array<{ __typename?: 'Layer', id: string, density?: number | null, layerType?: string | null, materialKey?: string | null, name?: string | null, visibleOuterLayer?: boolean | null, weight?: number | null }> | null }> | null }> | null } };

export const LayerFragmentDoc = gql`
    fragment layer on Layer {
  id
  density
  layerType
  materialKey
  name
  visibleOuterLayer
  weight
}
    `;
export const ComponentFragmentDoc = gql`
    fragment component on Component {
  id
  colour
  colourant
  componentType
  coverage
  name
  opacity
  position
  weight
  layers {
    ...layer
  }
}
    ${LayerFragmentDoc}`;
export const PackagingFragmentDoc = gql`
    fragment packaging on Packaging {
  id
  name
  packagingType
  position
  weight
  width
  length
  height
  volume
  components {
    ...component
  }
}
    ${ComponentFragmentDoc}`;
export const ProjectFragmentDoc = gql`
    fragment project on Project {
  id
  key
  name
  packagings {
    ...packaging
  }
}
    ${PackagingFragmentDoc}`;
export const CreateComponentDocument = gql`
    mutation createComponent($data: CreateComponentInput!) {
  createComponent(data: $data) {
    ...component
  }
}
    ${ComponentFragmentDoc}`;
export type CreateComponentMutationFn = Apollo.MutationFunction<CreateComponentMutation, CreateComponentMutationVariables>;

/**
 * __useCreateComponentMutation__
 *
 * To run a mutation, you first call `useCreateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComponentMutation, { data, loading, error }] = useCreateComponentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateComponentMutation(baseOptions?: Apollo.MutationHookOptions<CreateComponentMutation, CreateComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateComponentMutation, CreateComponentMutationVariables>(CreateComponentDocument, options);
      }
export type CreateComponentMutationHookResult = ReturnType<typeof useCreateComponentMutation>;
export type CreateComponentMutationResult = Apollo.MutationResult<CreateComponentMutation>;
export type CreateComponentMutationOptions = Apollo.BaseMutationOptions<CreateComponentMutation, CreateComponentMutationVariables>;
export const UpdateComponentDocument = gql`
    mutation updateComponent($data: UpdateComponentInput!) {
  updateComponent(data: $data) {
    ...component
  }
}
    ${ComponentFragmentDoc}`;
export type UpdateComponentMutationFn = Apollo.MutationFunction<UpdateComponentMutation, UpdateComponentMutationVariables>;

/**
 * __useUpdateComponentMutation__
 *
 * To run a mutation, you first call `useUpdateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComponentMutation, { data, loading, error }] = useUpdateComponentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateComponentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComponentMutation, UpdateComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateComponentMutation, UpdateComponentMutationVariables>(UpdateComponentDocument, options);
      }
export type UpdateComponentMutationHookResult = ReturnType<typeof useUpdateComponentMutation>;
export type UpdateComponentMutationResult = Apollo.MutationResult<UpdateComponentMutation>;
export type UpdateComponentMutationOptions = Apollo.BaseMutationOptions<UpdateComponentMutation, UpdateComponentMutationVariables>;
export const DuplicateComponentDocument = gql`
    mutation duplicateComponent($id: String!) {
  duplicateComponent(id: $id) {
    ...project
  }
}
    ${ProjectFragmentDoc}`;
export type DuplicateComponentMutationFn = Apollo.MutationFunction<DuplicateComponentMutation, DuplicateComponentMutationVariables>;

/**
 * __useDuplicateComponentMutation__
 *
 * To run a mutation, you first call `useDuplicateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateComponentMutation, { data, loading, error }] = useDuplicateComponentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicateComponentMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateComponentMutation, DuplicateComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateComponentMutation, DuplicateComponentMutationVariables>(DuplicateComponentDocument, options);
      }
export type DuplicateComponentMutationHookResult = ReturnType<typeof useDuplicateComponentMutation>;
export type DuplicateComponentMutationResult = Apollo.MutationResult<DuplicateComponentMutation>;
export type DuplicateComponentMutationOptions = Apollo.BaseMutationOptions<DuplicateComponentMutation, DuplicateComponentMutationVariables>;
export const DeleteComponentDocument = gql`
    mutation deleteComponent($id: String!) {
  deleteComponent(id: $id) {
    ...component
  }
}
    ${ComponentFragmentDoc}`;
export type DeleteComponentMutationFn = Apollo.MutationFunction<DeleteComponentMutation, DeleteComponentMutationVariables>;

/**
 * __useDeleteComponentMutation__
 *
 * To run a mutation, you first call `useDeleteComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComponentMutation, { data, loading, error }] = useDeleteComponentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteComponentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteComponentMutation, DeleteComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteComponentMutation, DeleteComponentMutationVariables>(DeleteComponentDocument, options);
      }
export type DeleteComponentMutationHookResult = ReturnType<typeof useDeleteComponentMutation>;
export type DeleteComponentMutationResult = Apollo.MutationResult<DeleteComponentMutation>;
export type DeleteComponentMutationOptions = Apollo.BaseMutationOptions<DeleteComponentMutation, DeleteComponentMutationVariables>;
export const CreateLayerDocument = gql`
    mutation createLayer($data: CreateLayerInput!) {
  createLayer(data: $data) {
    ...layer
  }
}
    ${LayerFragmentDoc}`;
export type CreateLayerMutationFn = Apollo.MutationFunction<CreateLayerMutation, CreateLayerMutationVariables>;

/**
 * __useCreateLayerMutation__
 *
 * To run a mutation, you first call `useCreateLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLayerMutation, { data, loading, error }] = useCreateLayerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLayerMutation(baseOptions?: Apollo.MutationHookOptions<CreateLayerMutation, CreateLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLayerMutation, CreateLayerMutationVariables>(CreateLayerDocument, options);
      }
export type CreateLayerMutationHookResult = ReturnType<typeof useCreateLayerMutation>;
export type CreateLayerMutationResult = Apollo.MutationResult<CreateLayerMutation>;
export type CreateLayerMutationOptions = Apollo.BaseMutationOptions<CreateLayerMutation, CreateLayerMutationVariables>;
export const UpdateLayerDocument = gql`
    mutation updateLayer($data: UpdateLayerInput!) {
  updateLayer(data: $data) {
    ...layer
  }
}
    ${LayerFragmentDoc}`;
export type UpdateLayerMutationFn = Apollo.MutationFunction<UpdateLayerMutation, UpdateLayerMutationVariables>;

/**
 * __useUpdateLayerMutation__
 *
 * To run a mutation, you first call `useUpdateLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLayerMutation, { data, loading, error }] = useUpdateLayerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateLayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLayerMutation, UpdateLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLayerMutation, UpdateLayerMutationVariables>(UpdateLayerDocument, options);
      }
export type UpdateLayerMutationHookResult = ReturnType<typeof useUpdateLayerMutation>;
export type UpdateLayerMutationResult = Apollo.MutationResult<UpdateLayerMutation>;
export type UpdateLayerMutationOptions = Apollo.BaseMutationOptions<UpdateLayerMutation, UpdateLayerMutationVariables>;
export const DuplicateLayerDocument = gql`
    mutation duplicateLayer($id: String!) {
  duplicateLayer(id: $id) {
    ...project
  }
}
    ${ProjectFragmentDoc}`;
export type DuplicateLayerMutationFn = Apollo.MutationFunction<DuplicateLayerMutation, DuplicateLayerMutationVariables>;

/**
 * __useDuplicateLayerMutation__
 *
 * To run a mutation, you first call `useDuplicateLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateLayerMutation, { data, loading, error }] = useDuplicateLayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicateLayerMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateLayerMutation, DuplicateLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateLayerMutation, DuplicateLayerMutationVariables>(DuplicateLayerDocument, options);
      }
export type DuplicateLayerMutationHookResult = ReturnType<typeof useDuplicateLayerMutation>;
export type DuplicateLayerMutationResult = Apollo.MutationResult<DuplicateLayerMutation>;
export type DuplicateLayerMutationOptions = Apollo.BaseMutationOptions<DuplicateLayerMutation, DuplicateLayerMutationVariables>;
export const DeleteLayerDocument = gql`
    mutation deleteLayer($id: String!) {
  deleteLayer(id: $id) {
    ...layer
  }
}
    ${LayerFragmentDoc}`;
export type DeleteLayerMutationFn = Apollo.MutationFunction<DeleteLayerMutation, DeleteLayerMutationVariables>;

/**
 * __useDeleteLayerMutation__
 *
 * To run a mutation, you first call `useDeleteLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLayerMutation, { data, loading, error }] = useDeleteLayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLayerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLayerMutation, DeleteLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLayerMutation, DeleteLayerMutationVariables>(DeleteLayerDocument, options);
      }
export type DeleteLayerMutationHookResult = ReturnType<typeof useDeleteLayerMutation>;
export type DeleteLayerMutationResult = Apollo.MutationResult<DeleteLayerMutation>;
export type DeleteLayerMutationOptions = Apollo.BaseMutationOptions<DeleteLayerMutation, DeleteLayerMutationVariables>;
export const CreatePackagingDocument = gql`
    mutation createPackaging($data: CreatePackagingInput!) {
  createPackaging(data: $data) {
    ...packaging
  }
}
    ${PackagingFragmentDoc}`;
export type CreatePackagingMutationFn = Apollo.MutationFunction<CreatePackagingMutation, CreatePackagingMutationVariables>;

/**
 * __useCreatePackagingMutation__
 *
 * To run a mutation, you first call `useCreatePackagingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePackagingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPackagingMutation, { data, loading, error }] = useCreatePackagingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePackagingMutation(baseOptions?: Apollo.MutationHookOptions<CreatePackagingMutation, CreatePackagingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePackagingMutation, CreatePackagingMutationVariables>(CreatePackagingDocument, options);
      }
export type CreatePackagingMutationHookResult = ReturnType<typeof useCreatePackagingMutation>;
export type CreatePackagingMutationResult = Apollo.MutationResult<CreatePackagingMutation>;
export type CreatePackagingMutationOptions = Apollo.BaseMutationOptions<CreatePackagingMutation, CreatePackagingMutationVariables>;
export const UpdatePackagingDocument = gql`
    mutation updatePackaging($data: UpdatePackagingInput!) {
  updatePackaging(data: $data) {
    ...packaging
  }
}
    ${PackagingFragmentDoc}`;
export type UpdatePackagingMutationFn = Apollo.MutationFunction<UpdatePackagingMutation, UpdatePackagingMutationVariables>;

/**
 * __useUpdatePackagingMutation__
 *
 * To run a mutation, you first call `useUpdatePackagingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePackagingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePackagingMutation, { data, loading, error }] = useUpdatePackagingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePackagingMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePackagingMutation, UpdatePackagingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePackagingMutation, UpdatePackagingMutationVariables>(UpdatePackagingDocument, options);
      }
export type UpdatePackagingMutationHookResult = ReturnType<typeof useUpdatePackagingMutation>;
export type UpdatePackagingMutationResult = Apollo.MutationResult<UpdatePackagingMutation>;
export type UpdatePackagingMutationOptions = Apollo.BaseMutationOptions<UpdatePackagingMutation, UpdatePackagingMutationVariables>;
export const DuplicatePackagingDocument = gql`
    mutation duplicatePackaging($id: String!) {
  duplicatePackaging(id: $id) {
    ...project
  }
}
    ${ProjectFragmentDoc}`;
export type DuplicatePackagingMutationFn = Apollo.MutationFunction<DuplicatePackagingMutation, DuplicatePackagingMutationVariables>;

/**
 * __useDuplicatePackagingMutation__
 *
 * To run a mutation, you first call `useDuplicatePackagingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicatePackagingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicatePackagingMutation, { data, loading, error }] = useDuplicatePackagingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicatePackagingMutation(baseOptions?: Apollo.MutationHookOptions<DuplicatePackagingMutation, DuplicatePackagingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicatePackagingMutation, DuplicatePackagingMutationVariables>(DuplicatePackagingDocument, options);
      }
export type DuplicatePackagingMutationHookResult = ReturnType<typeof useDuplicatePackagingMutation>;
export type DuplicatePackagingMutationResult = Apollo.MutationResult<DuplicatePackagingMutation>;
export type DuplicatePackagingMutationOptions = Apollo.BaseMutationOptions<DuplicatePackagingMutation, DuplicatePackagingMutationVariables>;
export const DeletePackagingDocument = gql`
    mutation deletePackaging($id: String!) {
  deletePackaging(id: $id) {
    ...packaging
  }
}
    ${PackagingFragmentDoc}`;
export type DeletePackagingMutationFn = Apollo.MutationFunction<DeletePackagingMutation, DeletePackagingMutationVariables>;

/**
 * __useDeletePackagingMutation__
 *
 * To run a mutation, you first call `useDeletePackagingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePackagingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePackagingMutation, { data, loading, error }] = useDeletePackagingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePackagingMutation(baseOptions?: Apollo.MutationHookOptions<DeletePackagingMutation, DeletePackagingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePackagingMutation, DeletePackagingMutationVariables>(DeletePackagingDocument, options);
      }
export type DeletePackagingMutationHookResult = ReturnType<typeof useDeletePackagingMutation>;
export type DeletePackagingMutationResult = Apollo.MutationResult<DeletePackagingMutation>;
export type DeletePackagingMutationOptions = Apollo.BaseMutationOptions<DeletePackagingMutation, DeletePackagingMutationVariables>;
export const ProjectDocument = gql`
    query Project($id: String!) {
  project(id: $id) {
    ...project
  }
}
    ${ProjectFragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectsDocument = gql`
    query Projects($name: String, $key: String, $take: Int, $skip: Int) {
  projects(name: $name, key: $key, take: $take, skip: $skip) {
    id
    name
    key
    packagingsCount
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      key: // value for 'key'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($data: UpdateProjectInput!) {
  updateProject(data: $data) {
    ...project
  }
}
    ${ProjectFragmentDoc}`;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;