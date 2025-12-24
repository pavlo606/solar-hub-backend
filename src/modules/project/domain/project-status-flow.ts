import { ProjectStatus } from './project-status.enum';

export const PROJECT_STATUS_FLOW: Record<ProjectStatus, ProjectStatus[]> = {
  DRAFT: [ProjectStatus.APPROVED, ProjectStatus.CANCELLED],
  APPROVED: [ProjectStatus.IN_PROGRESS, ProjectStatus.CANCELLED],
  IN_PROGRESS: [ProjectStatus.COMPLETED],
  COMPLETED: [],
  CANCELLED: [],
};

export function canChangeStatus(
  from: ProjectStatus,
  to: ProjectStatus,
): boolean {
  return PROJECT_STATUS_FLOW[from].includes(to);
}
