import { Role } from '../app/role/role.entity';

export const roles = Role.fromPrototypes([
  { id: 'dashboard', iconName: 'fas tachometer-alt' },
  { id: 'dashboard.widgets', iconName: 'fas tachometer-alt' },
  { id: 'dashboard.widgets.incompleteIncidents' },
  { id: 'dashboard.widgets.trends' },
  { id: 'dashboard.widgets.tasks' },

  { id: 'incidents' },
  { id: 'incidents.index', iconName: 'fas folder', navKey: 'incidents' },
  { id: 'incidents.index.all', iconName: 'fas lock-open' },

  { id: 'incidents.report', iconName: 'fas folder' },
  { id: 'incidents.report.monitor' },
  { id: 'incidents.report.create' },
  { id: 'incidents.report.editTitle' },
  { id: 'incidents.report.lock' },
  { id: 'incidents.report.delete' },
  { id: 'incidents.report.conclusion' }, // unsure about this name
  { id: 'incidents.report.guestData' },
  { id: 'incidents.report.suggestions' },
  { id: 'incidents.report.allTitlesOnMouseover' },
  { id: 'incidents.report.allowNotificationSuppression' },
  { id: 'incidents.report.defaultNotificationSuppression' },

  { id: 'incidents.alarms', iconName: 'fas bell', navKey: 'incidents' },

  { id: 'incidents.watchlist', iconName: 'fas eye', navKey: 'incidents' },

  { id: 'incidents.imports', iconName: 'fas upload', navKey: 'incidents' },
  { id: 'incidents.imports.import', iconName: 'fas upload' },
  {
    id: 'incidents.imports.socialMediaSearch',
    iconName: 'fab facebook-square',
  },

  { id: 'analysis' },
  { id: 'analysis.incidents', iconName: 'far chart-bar', navKey: 'analysis' },
  {
    id: 'analysis.instantSheets',
    iconName: 'far chart-bar',
    navKey: 'analysis',
  },

  { id: 'users' },
  { id: 'users.users', iconName: 'fas user', navKey: 'users' },
  { id: 'users.users.index', iconName: 'fas user' },
  { id: 'users.users.index.ownGroup', iconName: 'fas user-friends' },
  { id: 'users.users.create', iconName: 'fas user-plus' },
  { id: 'users.users.edit', iconName: 'fas user-edit' },
  { id: 'users.users.delete', iconName: 'fas user-times' },

  { id: 'users.tasks', iconName: 'fas tasks', navKey: 'users' },
  { id: 'users.tasks.create', iconName: 'fas tasks' },

  { id: 'users.standby', iconName: 'far calendar-alt', navKey: 'users' },
  { id: 'users.standby.create' },
  { id: 'users.standby.edit' },

  { id: 'users.standIn', iconName: 'far clock', navKey: 'users' },
  { id: 'users.standIn.create' },
  { id: 'users.standIn.edit' },

  { id: 'locations' },
  {
    id: 'locations.index',
    iconName: 'fas map-marker-alt',
    navKey: 'locations',
  },
  { id: 'locations.index.all', iconName: 'fa lock-open' },
  { id: 'locations.manage', iconName: 'fas map-marker-alt' },
  { id: 'locations.manage.details' },
  { id: 'locations.manage.create' },
  { id: 'locations.manage.edit' },
  { id: 'locations.manage.editAdvanced' },
  { id: 'locations.manage.delete' },

  { id: 'profile.show', iconName: 'fas user' },
  { id: 'profile.settings', iconName: 'fas cog' },
  { id: 'profile.settings.password', iconName: 'fas key' },

  { id: 'handbook', iconName: 'fas book', navKey: 'handbook' },

  { id: 'admin' },

  {
    id: 'admin.userGroups',
    iconName: 'fas users',
    navKey: 'admin',
    navSegment: 0,
  },
  { id: 'admin.userGroups.create' },
  { id: 'admin.userGroups.edit' },
  { id: 'admin.userGroups.delete' },
  { id: 'admin.userGroups.toggleActive' },

  {
    id: 'admin.scenarios',
    iconName: 'fas folder',
    navKey: 'admin',
    navSegment: 10,
  },
  { id: 'admin.scenarios.create' },
  { id: 'admin.scenarios.edit' },
  { id: 'admin.scenarios.general' },
  { id: 'admin.scenarios.notifications' },
  { id: 'admin.scenarios.permissions' },
  { id: 'admin.scenarios.forms' },
  { id: 'admin.scenarios.tasks' },

  {
    id: 'admin.scenarioCategories',
    iconName: 'far folder',
    navKey: 'admin',
    navSegment: 10,
  },
  { id: 'admin.scenarioCategories.create' },
  { id: 'admin.scenarioCategories.edit' },

  {
    id: 'admin.sources',
    iconName: 'fas cog',
    navKey: 'admin',
    navSegment: 10,
  },

  {
    id: 'admin.instantSheets',
    iconName: 'fas pen-square',
    navKey: 'admin',
    navSegment: 10,
  },
  { id: 'admin.instantSheets.create' },
  { id: 'admin.instantSheets.delete' },

  {
    id: 'admin.instantSheetElements',
    iconName: 'fas bars',
    navKey: 'admin',
    navSegment: 10,
  },
  { id: 'admin.instantSheetElements.create' },
  { id: 'admin.instantSheetElements.delete' },

  {
    id: 'admin.forms',
    iconName: 'fas plus-square',
    navKey: 'admin',
    navSegment: 10,
  },
  { id: 'admin.forms.create' },
  { id: 'admin.forms.delete' },

  {
    id: 'admin.reportSources',
    iconName: 'fas info-circle',
    navKey: 'admin',
    navSegment: 10,
  },
  { id: 'admin.reportSources.create' },
  { id: 'admin.reportSources.delete' },

  {
    id: 'admin.categories',
    iconName: 'far edit',
    navKey: 'admin',
    navSegment: 10,
  },
  { id: 'admin.categories.edit' },

  {
    id: 'admin.currencies',
    iconName: 'fas euro-sign',
    navKey: 'admin',
    navSegment: 20,
  },

  {
    id: 'admin.taskTemplates',
    iconName: 'fas tasks',
    navKey: 'admin',
    navSegment: 20,
  },
  { id: 'admin.taskTemplates.create' },
  { id: 'admin.taskTemplates.edit' },
  { id: 'admin.taskTemplates.delete' },

  {
    id: 'admin.locationAttributes',
    iconName: 'far building',
    navKey: 'admin',
    navSegment: 20,
  },
  { id: 'admin.locationAttributes.create' },
  { id: 'admin.locationAttributes.delete' },

  {
    id: 'admin.distributionCenters',
    iconName: 'far dot-circle',
    navKey: 'admin',
    navSegment: 20,
  },
  { id: 'admin.distributionCenters.create' },
  { id: 'admin.distributionCenters.delete' },

  {
    id: 'admin.regions',
    iconName: 'far map',
    navKey: 'admin',
    navSegment: 20,
  },
  { id: 'admin.regions.create' },

  {
    id: 'admin.crisisManagement',
    iconName: 'fas exclamation-triangle',
    navKey: 'admin',
    navSegment: 30,
  },
  { id: 'admin.crisisManagement.create' },
  { id: 'admin.crisisManagement.edit' },
  { id: 'admin.crisisManagement.delete' },

  {
    id: 'admin.alarms',
    iconName: 'fas bell',
    navKey: 'admin',
    navSegment: 30,
  },
  { id: 'admin.alarms.create' },

  {
    id: 'admin.serviceProviders',
    iconName: 'fas address-card',
    navKey: 'admin',
    navSegment: 40,
  },
  { id: 'admin.serviceProviders.create' },
  { id: 'admin.serviceProviders.edit' },
  { id: 'admin.serviceProviders.delete' },

  {
    id: 'admin.lists',
    iconName: 'fas share-alt-square',
    navKey: 'admin',
    navSegment: 40,
  },
  { id: 'admin.lists.create' },
  { id: 'admin.lists.edit' },
  { id: 'admin.lists.delete' },

  {
    id: 'admin.languages',
    iconName: 'fas globe-americas',
    navKey: 'admin',
    navSegment: 50,
  },

  {
    id: 'admin.notificationTemplates',
    iconName: 'far envelope',
    navKey: 'admin',
    navSegment: 50,
  },
  { id: 'admin.notificationTemplates.create' },

  {
    id: 'admin.settings',
    iconName: 'fas wrench',
    navKey: 'admin',
    navSegment: 60,
  },

  {
    id: 'admin.activities',
    iconName: 'far list-alt',
    navKey: 'admin',
    navSegment: 60,
  },
]);
