import { registerEnumType } from '@nestjs/graphql';

export enum ScenarioPermissionType {
  REPORT_CREATE = 'REPORT_CREATE',
  REPORT_READ = 'REPORT_READ',
  REPORT_EDIT = 'REPORT_EDIT',
  REPORT_NO_NOTIFICATIONS = 'REPORT_NO_NOTIFICATIONS',
  REPORT_PERSON_DATA = 'REPORT_PERSON_DATA',
  FORMS_CREATE = 'FORMS_CREATE',
  FORMS_READ = 'FORMS_READ',
  ANALYSIS = 'ANALYSIS',
}

registerEnumType(ScenarioPermissionType, {
  name: 'ScenarioAssignmentType',
  description:
    'The different kinds of Assignments a User or User-Group can have ' +
    'in relation to an incident or incident-Category',
});
