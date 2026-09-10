import type { Question } from '../../types';
import { aAiQuestions } from './a-ai';
import { bModelQuestions } from './b-model';
import { cChatgptQuestions } from './c-chatgpt';
import { dServiceQuestions } from './d-service';
import { eAgentQuestions } from './e-agent';
import { fSecurityQuestions } from './f-security';
import { gPrivacyQuestions } from './g-privacy';
import { hRightsQuestions } from './h-rights';
import { jPrinciplesQuestions } from './j-principles';
import { kPromptQuestions } from './k-prompt';
import { lBusinessQuestions } from './l-business';

/** 確認問題の全体。入門編は前提をそろえる章なので確認問題を持たない。 */
export const QUESTIONS: Question[] = [
  ...aAiQuestions,
  ...bModelQuestions,
  ...cChatgptQuestions,
  ...dServiceQuestions,
  ...eAgentQuestions,
  ...fSecurityQuestions,
  ...gPrivacyQuestions,
  ...hRightsQuestions,
  ...jPrinciplesQuestions,
  ...kPromptQuestions,
  ...lBusinessQuestions,
];

export const questionById = (id: string): Question | undefined => QUESTIONS.find((q) => q.id === id);

export const questionsOfCategory = (categoryId: string): Question[] =>
  QUESTIONS.filter((q) => q.categoryId === categoryId);

export const questionsOfSection = (sectionId: string): Question[] =>
  QUESTIONS.filter((q) => q.sectionId === sectionId);
