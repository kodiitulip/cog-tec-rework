import {
  BooleanField,
  Create,
  Datagrid,
  Edit,
  InfiniteList,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  required,
  SelectField,
  SelectInput,
  SimpleForm,
  TextField,
} from 'react-admin';

export const UserProgressList = () => (
  <InfiniteList
    sort={{
      field: 'userName',
      order: 'ASC',
    }}
  >
    <Datagrid>
      <TextField source='userName' />
      <TextField source='userImageSrc' />
      {/* <ReferenceField source='activeCourseId' reference='courses' />
       <ReferenceField source='activeLessonId' reference='lessons' /> */}
      <NumberField source='hearts' />
      <NumberField source='points' />
      <BooleanField source='rankHidden' />
    </Datagrid>
  </InfiniteList>
);

export const UserRolesList = () => (
  <InfiniteList>
    <Datagrid rowClick='edit'>
      <NumberField source='id' />
      <ReferenceField
        source='userId'
        reference='user-progress'
      />
      <SelectField
        source='role'
        choices={[
          {
            id: 'ADMIN',
            name: 'ADMIN',
          },
        ]}
      />
    </Datagrid>
  </InfiniteList>
);

export const UserRolesCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput
        source='id'
        validate={[required()]}
      />
      <ReferenceInput
        source='userId'
        reference='user-progress'
      >
        <SelectInput validate={[required()]} />
      </ReferenceInput>
      <SelectInput
        source='role'
        choices={[{ id: 'ADMIN', name: 'ADMIN' }]}
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
);

export const UserRolesEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput
        source='id'
        validate={[required()]}
      />
      <ReferenceInput
        source='userId'
        reference='user-progress'
      >
        <SelectInput validate={[required()]} />
      </ReferenceInput>
      <SelectInput
        source='role'
        choices={[{ id: 'ADMIN', name: 'ADMIN' }]}
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);
