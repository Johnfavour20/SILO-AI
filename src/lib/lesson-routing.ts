export const lessonQuestionIdMap: Record<string, string> = {
  'sim-1': 'simultaneous-1',
  'sim-2': 'simultaneous-2',
  'sim-3': 'simultaneous-3',
  'sim-4': 'word-1',
  'quad-1': 'quadratic-1',
  'quad-2': 'quadratic-2',
  'quad-3': 'quadratic-3',
  'quad-4': 'quadratic-4',
};

export function resolveLessonToQuestionId(lessonId: string): string {
  const normalizedLessonId = lessonId?.trim() ?? '';

  if (!normalizedLessonId) {
    return normalizedLessonId;
  }

  if (Object.prototype.hasOwnProperty.call(lessonQuestionIdMap, normalizedLessonId)) {
    return lessonQuestionIdMap[normalizedLessonId];
  }

  if (/^(simultaneous|quadratic|word)-/.test(normalizedLessonId)) {
    return normalizedLessonId;
  }

  return normalizedLessonId;
}
