'use client';

import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import dynamic from 'next/dynamic';
import { CourseList, CourseCreate, CourseEdit } from './resources/courses';
import { UnitsCreate, UnitsEdit, UnitsList } from './resources/units';
import { LessonsCreate, LessonsEdit, LessonsList } from './resources/lessons';
import { ChallengeCreate, ChallengeEdit, ChallengeList } from './resources/challenge';
import { ChallengeOptionsCreate, ChallengeOptionsEdit, ChallengeOptionsList } from './resources/challenge-options';

const dataProvider = simpleRestProvider('/api');

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name='courses'
        recordRepresentation='title'
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />
      <Resource
        name='units'
        recordRepresentation='title'
        list={UnitsList}
        create={UnitsCreate}
        edit={UnitsEdit}
      />
      <Resource
        name='lessons'
        recordRepresentation='title'
        list={LessonsList}
        create={LessonsCreate}
        edit={LessonsEdit}
      />
      <Resource
        name='challenges'
        recordRepresentation='title'
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />
      <Resource
        name='challenge-options'
        recordRepresentation='title'
        list={ChallengeOptionsList}
        create={ChallengeOptionsCreate}
        edit={ChallengeOptionsEdit}
      />
    </Admin>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
