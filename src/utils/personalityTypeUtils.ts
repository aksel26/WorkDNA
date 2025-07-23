/**
 * 성격 유형 코드를 별칭으로 변환하는 유틸리티 함수
 */

export const getPersonalityTypeAlias = (typeCode: string): string => {
  const typeAliases: Record<string, string> = {
    'AB': '행동대장',
    'AA': '사교왕', 
    'BB': '조언자',
    'BA': '평화주의자'
  };

  return typeAliases[typeCode] || typeCode;
};

/**
 * 성격 유형 별칭 목록을 반환하는 함수
 */
export const getPersonalityTypeAliases = (): Record<string, string> => {
  return {
    'AB': '행동대장',
    'AA': '사교왕', 
    'BB': '조언자',
    'BA': '평화주의자'
  };
};

/**
 * 별칭으로부터 성격 유형 코드를 찾는 함수
 */
export const getPersonalityTypeCodeFromAlias = (alias: string): string | null => {
  const typeAliases = getPersonalityTypeAliases();
  const entry = Object.entries(typeAliases).find(([, value]) => value === alias);
  return entry ? entry[0] : null;
};