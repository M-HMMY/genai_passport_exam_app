import type { TextbookSection } from '../../types';
import { intro } from './intro';
import { aAi } from './a-ai';
import { bModel } from './b-model';
import { cChatgpt } from './c-chatgpt';
import { dService } from './d-service';
import { eAgent } from './e-agent';
import { fSecurity } from './f-security';
import { gPrivacy } from './g-privacy';
import { hRights } from './h-rights';
import { jPrinciples } from './j-principles';
import { kPrompt } from './k-prompt';
import { lBusiness } from './l-business';

/**
 * 教本の全セクション。CATEGORIES の並び順に対応させている。
 *
 * ファイルは章ごとに 1 つ。複数人（エージェント）で並行して書くとき、
 * 1 ファイル 1 担当にすると衝突しないため。
 */
export const SECTIONS: TextbookSection[] = [
  ...intro,
  ...aAi,
  ...bModel,
  ...cChatgpt,
  ...dService,
  ...eAgent,
  ...fSecurity,
  ...gPrivacy,
  ...hRights,
  ...jPrinciples,
  ...kPrompt,
  ...lBusiness,
];

export const sectionById = (id: string): TextbookSection | undefined => SECTIONS.find((s) => s.id === id);

export const sectionsOfCategory = (categoryId: string): TextbookSection[] =>
  SECTIONS.filter((s) => s.categoryId === categoryId);

export const totalMinutes = SECTIONS.reduce((sum, s) => sum + s.minutes, 0);
