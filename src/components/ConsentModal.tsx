import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface ConsentModalProps {
  onSubmit: (data: {
    name: string;
    gender: string;
    ageRange: string;
    consent: boolean;
  }) => void;
}

export interface ConsentModalRef {
  submit: () => void;
}

export const ConsentModal = React.forwardRef<
  ConsentModalRef,
  ConsentModalProps
>(({ onSubmit }, ref) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    ageRange: "",
    consent: false,
  });
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  const formDataRef = React.useRef(formData);

  // Keep ref in sync with state
  React.useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  console.log("formData:", formData);

  const handleSubmit = React.useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const currentFormData = formDataRef.current;
      if (!currentFormData.consent) {
        toast.error(t("consent.modal.validation.consentRequired"));
        return;
      }
      onSubmit(currentFormData);
    },
    [onSubmit]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      submit: handleSubmit,
    }),
    [handleSubmit]
  );

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
      <form className="space-y-3 ">
        {/* Name Input */}
        <div>
          <Label
            htmlFor="text"
            className="block text-xs font-medium text-black mb-1"
          >
            {t("consent.modal.form.nameLabel")}
          </Label>
          <Input
            type="text"
            value={formData.name}
            className="text-xs"
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={t("consent.modal.form.namePlaceholder")}
          />
        </div>

        {/* Gender Selection */}
        <div>
          <Label className="block text-xs font-medium text-black mb-2">
            {t("consent.modal.form.genderLabel")}
          </Label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleChange("gender", "male")}
              className={`flex-1 p-2 rounded-lg border text-xs text-center transition-colors ${
                formData.gender === "male"
                  ? "border-blue-400 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              {t("consent.modal.form.male")}
            </button>
            <button
              type="button"
              onClick={() => handleChange("gender", "female")}
              className={`flex-1 p-2 rounded-lg border text-xs text-center transition-colors ${
                formData.gender === "female"
                  ? "border-pink-400 bg-pink-50 text-pink-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              {t("consent.modal.form.female")}
            </button>
            <button
              type="button"
              onClick={() => handleChange("gender", "other")}
              className={`flex-1 p-2 rounded-lg border text-xs text-center transition-colors ${
                formData.gender === "other"
                  ? "border-gray-400 bg-gray-50 text-gray-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              {t("consent.modal.form.other")}
            </button>
          </div>
        </div>

        {/* Age Range Selection */}
        <div>
          <Label className="block text-xs font-medium text-black mb-1">
            {t("consent.modal.form.ageLabel")}
          </Label>
          <Select
            value={formData.ageRange}
            onValueChange={(value) => handleChange("ageRange", value)}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder={t("consent.modal.form.agePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-xs" value="20s">
                {t("consent.modal.form.age20s")}
              </SelectItem>
              <SelectItem className="text-xs" value="30s">
                {t("consent.modal.form.age30s")}
              </SelectItem>
              <SelectItem className="text-xs" value="40s">
                {t("consent.modal.form.age40s")}
              </SelectItem>
              <SelectItem className="text-xs" value="50s">
                {t("consent.modal.form.age50s")}
              </SelectItem>
              <SelectItem className="text-xs" value="60+">
                {t("consent.modal.form.age60plus")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Privacy Policy Consent Button */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-black">
              {t("consent.modal.privacy.title")}
            </span>
            <span
              className={`text-xs ${
                formData.consent ? "text-green-600" : "text-gray-400"
              }`}
            >
              {formData.consent ? t("consent.modal.privacy.completed") : t("consent.modal.privacy.required")}
            </span>
          </div>

          <Dialog
            open={isPrivacyDialogOpen}
            onOpenChange={setIsPrivacyDialogOpen}
          >
            <DialogTrigger asChild>
              <button
                type="button"
                className={`w-full p-3 rounded-lg border text-left transition-colors text-xs ${
                  formData.consent
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t("consent.modal.privacy.viewDetails")}
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-xs">
              <DialogHeader>
                <DialogTitle className="text-sm">
                  {t("consent.modal.privacy.dialogTitle")}
                </DialogTitle>
              </DialogHeader>

              <div className="text-xs space-y-3 text-black">
                <p>
                  <strong>{t("consent.modal.privacy.purpose")}</strong> {t("consent.modal.privacy.purposeText")}
                </p>
                <p>
                  <strong>{t("consent.modal.privacy.items")}</strong> {t("consent.modal.privacy.itemsText")}
                </p>
                <p>
                  <strong>{t("consent.modal.privacy.retention")}</strong> {t("consent.modal.privacy.retentionText")}
                </p>
                <p>
                  <strong>{t("consent.modal.privacy.processing")}</strong> {t("consent.modal.privacy.processingText")}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {t("consent.modal.privacy.notice")}
                </p>
              </div>

              <DialogFooter>
                <button
                  onClick={handlePrivacyConsent}
                  className="btn-primary w-full text-xs"
                >
                  {t("consent.modal.privacy.agreeButton")}
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
});
