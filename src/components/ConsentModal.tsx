import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    gender: string;
    ageRange: string;
    consent: boolean;
  }) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    ageRange: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#6b6a6a] rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">개인정보 수집 및 이용 동의</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                이름 (선택사항)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="form-input"
                placeholder="이름을 입력하세요"
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                성별 (선택사항)
              </label>
              <div className="flex space-x-4">
                {[
                  { value: 'male', label: '남성' },
                  { value: 'female', label: '여성' },
                  { value: 'other', label: '기타' }
                ].map(option => (
                  <label key={option.value} className="flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value={option.value}
                      checked={formData.gender === option.value}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Age Range Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                연령대 (선택사항)
              </label>
              <select
                value={formData.ageRange}
                onChange={(e) => handleChange('ageRange', e.target.value)}
                className="form-input"
              >
                <option value="">선택하세요</option>
                <option value="20s">20대</option>
                <option value="30s">30대</option>
                <option value="40s">40대</option>
                <option value="50s">50대</option>
                <option value="60+">60대 이상</option>
              </select>
            </div>

            {/* Privacy Policy */}
            <div className="bg-[#7e7d7d] p-4 rounded-lg">
              <h3 className="font-medium text-white mb-2">개인정보 수집 및 이용 내역</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p><strong>수집 목적:</strong> 업무 스타일 진단 서비스 제공 및 통계 분석</p>
                <p><strong>수집 항목:</strong> 이름, 성별, 연령대, 테스트 응답 (모든 항목 선택사항)</p>
                <p><strong>보유 기간:</strong> 서비스 제공 완료 후 즉시 삭제</p>
                <p><strong>처리 방식:</strong> 익명화하여 통계 목적으로만 사용</p>
                <p className="text-xs text-gray-400 mt-2">
                  * 개인정보는 암호화되어 저장되며, 서비스 개선 및 통계 분석 목적으로만 사용됩니다.
                </p>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => handleChange('consent', e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-sm text-white">
                개인정보 수집 및 이용에 동의합니다. (필수)
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                취소
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                동의하고 시작하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};