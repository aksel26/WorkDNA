import React from 'react';
import { Share2, RefreshCw, Heart, AlertTriangle } from 'lucide-react';
import type { PersonalityType } from '../data/personalityTypes';
import { typeDetails } from '../data/typeDetails';

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
  const detail = typeDetails[personalityType.id];
  
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
            {detail?.summary || personalityType.name}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 특징</h3>
            <div className="space-y-2">
              {detail?.characteristics.map((trait, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-700"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                  {trait}
                </div>
              ))}
            </div>
          </div>

          {/* Needs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              나에게 필요한 것은
            </h3>
            <p className="text-gray-700 leading-relaxed bg-red-50 p-3 rounded-lg">
              {detail?.needs}
            </p>
          </div>

          {/* Negative Traits */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              내가 삐뚤어지면
            </h3>
            <div className="space-y-2 bg-yellow-50 p-3 rounded-lg">
              {detail?.negativeTraits.map((trait, index) => (
                <div
                  key={index}
                  className="flex items-start text-gray-700"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                  {trait}
                </div>
              ))}
            </div>
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