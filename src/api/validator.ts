export function validateRequiredTimeRange(startTime?: string, endTime?: string): void {
  if (!startTime) {
    throw new Error('startTime is required');
  }
  if (!endTime) {
    throw new Error('endTime is required');
  }
}
