import React from 'react';
import { Share2, RefreshCw } from 'lucide-react';
import type { PersonalityType } from '../data/personalityTypes';

interface TestResultProps {
  personalityType: PersonalityType;
  scores: Record<string, number>;
  onRestart: () => void;
  onShare: () => void;
}

export const TestResult: React.FC<TestResultProps> = ({
  personalityType,
  scores,
  onRestart,
  onShare,
}) => {
  const maxScore = Math.max(...Object.values(scores));
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Result Header */}
      <div className="text-center mb-8">
        <div className="animate-slide-up">
          <div 
            className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: personalityType.color }}
          >
            {personalityType.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {personalityType.name}
          </h1>
          <p className="text-gray-600 text-lg">
            {personalityType.description}
          </p>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="card mb-6 animate-fade-in">
        <div className="space-y-6">
          {/* Traits */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 특성</h3>
            <div className="flex flex-wrap gap-2">
              {personalityType.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">강점</h3>
            <ul className="space-y-2">
              {personalityType.strengths.map((strength, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Work Style */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">업무 스타일</h3>
            <p className="text-gray-700 leading-relaxed">
              {personalityType.workStyle}
            </p>
          </div>

          {/* Team Role */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">적합한 역할</h3>
            <p className="text-gray-700 leading-relaxed">
              {personalityType.teamRole}
            </p>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="card mb-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">유형별 점수</h3>
        <div className="space-y-3">
          {Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .map(([type, score]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">
                  {type.replace('-', ' ')}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(score / maxScore) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">
                    {score}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={onShare}
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <Share2 size={20} />
          <span>결과 공유하기</span>
        </button>
        <button
          onClick={onRestart}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <RefreshCw size={20} />
          <span>다시 테스트하기</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pb-8">
        <p>이 결과는 당신의 업무 성향을 분석한 것입니다.</p>
        <p>더 정확한 결과를 위해 솔직하게 답변해주세요.</p>
      </div>
    </div>
  );
};