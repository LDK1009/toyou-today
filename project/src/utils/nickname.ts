// 형용사 목록
const adjectives = [
  "행복한",
  "즐거운",
  "신나는",
  "멋진",
  "귀여운",
  "화려한",
  "용감한",
  "현명한",
  "친절한",
  "활발한",
  "재미있는",
  "똑똑한",
  "창의적인",
  "열정적인",
  "사랑스러운",
  "강력한",
  "빛나는",
  "평화로운",
  "상냥한",
  "유쾌한",
  "놀라운",
  "환상적인",
];

// 명사 목록
const nouns = [
  "호랑이",
  "사자",
  "토끼",
  "고양이",
  "강아지",
  "판다",
  "코끼리",
  "기린",
  "여우",
  "늑대",
  "곰",
  "독수리",
  "참새",
  "돌고래",
  "고래",
  "거북이",
  "펭귄",
  "코알라",
  "햄스터",
  "다람쥐",
  "공룡",
  "용",
  "유니콘",
];

type generateRandomNicknamePropsType = {
  separator?: string;
  withNumber?: boolean;
  maxNumber?: number;
};

export function generateRandomNickname({ separator = " ", withNumber = false, maxNumber = 100 }: generateRandomNicknamePropsType): string {
  // 랜덤 형용사 선택
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  // 랜덤 명사 선택
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  // 기본 닉네임 생성
  let nickname = `${randomAdjective}${separator}${randomNoun}`;

  // 숫자 추가 옵션이 활성화된 경우
  if (withNumber) {
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    nickname = `${nickname}${separator}${randomNumber}`;
  }

  return nickname;
}