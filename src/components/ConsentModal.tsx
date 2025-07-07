import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

interface ConsentModalProps {
  onClose: () => void;
  onSubmit: (data: { name: string; gender: string; ageRange: string; consent: boolean }) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    ageRange: "",
    consent: false,
  });
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  console.log("formData:", formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    onSubmit(formData);
  };

  const handlePrivacyConsent = () => {
    setFormData((prev) => ({ ...prev, consent: true }));
    setIsPrivacyDialogOpen(false);
  };

  const handleChange = (field: string, value: string | boolean) => {
    console.log("field:", field, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-1">
      <form onSubmit={handleSubmit} className="space-y-6 ">
        {/* Name Input */}
        <div>
          <Label htmlFor="text" className="block text-sm font-medium text-black mb-1">
            이름 (선택사항)
          </Label>
          <Input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="이름을 입력하세요" />
        </div>

        {/* Gender Selection */}
        <div>
          <Label className="block text-sm font-medium text-black mb-2">성별 (선택사항)</Label>
          <RadioGroup value={formData.gender} onValueChange={(value) => handleChange("gender", value)} className="flex">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">남성</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">여성</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">기타</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Age Range Selection */}
        <div>
          <Label className="block text-sm font-medium text-black mb-1">연령대</Label>
          <Select value={formData.ageRange} onValueChange={(value) => handleChange("ageRange", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="연령대를 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20s">20대</SelectItem>
              <SelectItem value="30s">30대</SelectItem>
              <SelectItem value="40s">40대</SelectItem>
              <SelectItem value="50s">50대</SelectItem>
              <SelectItem value="60+">60대 이상</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Privacy Policy Consent Button */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-black">개인정보 수집 및 이용 동의 (필수)</span>
            <span className={`text-sm ${formData.consent ? "text-green-600" : "text-gray-400"}`}>{formData.consent ? "✓ 동의완료" : "동의필요"}</span>
          </div>

          <Dialog open={isPrivacyDialogOpen} onOpenChange={setIsPrivacyDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  formData.consent ? "bg-green-50 border-green-200 text-green-700" : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                개인정보 수집 및 이용 내역 확인하기
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-xs">
              <DialogHeader>
                <DialogTitle>개인정보 수집 및 이용</DialogTitle>
              </DialogHeader>

              <div className="text-sm space-y-3 text-black">
                <p>
                  <strong>수집 목적:</strong> 업무 스타일 진단 서비스 제공 및 통계 분석
                </p>
                <p>
                  <strong>수집 항목:</strong> 이름, 성별, 연령대, 테스트 응답 (모든 항목 선택사항)
                </p>
                <p>
                  <strong>보유 기간:</strong> 서비스 제공 완료 후 즉시 삭제
                </p>
                <p>
                  <strong>처리 방식:</strong> 익명화하여 통계 목적으로만 사용
                </p>
                <p className="text-xs text-gray-500 mt-2">* 개인정보는 암호화되어 저장되며, 서비스 개선 및 통계 분석 목적으로만 사용됩니다.</p>
              </div>

              <DialogFooter>
                <button onClick={handlePrivacyConsent} className="btn-primary w-full">
                  동의하고 확인
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            취소
          </button>
          <button type="submit" className="btn-primary flex-1">
            동의하고 시작하기
          </button>
        </div>
      </form>
    </div>
  );
};
